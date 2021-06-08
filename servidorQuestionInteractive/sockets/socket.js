const { io } = require("../app");

let Classroom = require("../models/Classroom");

const MSessionClass = require("./query/QuerySessionCls");

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const SessionClassroom = require("../models/SessionClassroom");
const sessionStore = new InMemorySessionStore();

// Configuration global
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  const IdClassroom = socket.handshake.auth.idClassroom;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    //console.log("session", session);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      socket.idClassroom = session.idClassroom;
      return next();
    }
  }
  const username = socket.handshake.auth.userName;

  if (!username) {
    return next(new Error("invalid username"));
  }

  // create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  socket.idClassroom = IdClassroom;

  next();
});

io.on("connection", (socket) => {
  console.log(
    "Se conectó:" + socket.username + " y su room es: " + socket.idClassroom,
    socket.sessionID
  );

  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    idClassroom: socket.idClassroom,
    connected: true,
  });

  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    if (session.connected) {
      users.push({
        userID: session.userID,
        username: session.username,
        connected: session.connected,
        idClassroom: socket.IdClassroom,
      });
    }
  });

  socket.emit("users", users);

  const sessionData = sessionStore.findSession(socket.sessionID);

  io.to(sessionData.idClassroom).emit("newUser", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on("joinRooms", (id_classroom) => {
    try {
      Classroom.find({ id_classroom }, async (err, clsDB) => {
        //console.log(clsDB);
        if (err) {
          socket.disconnect();
        } else {
          if (clsDB.length > 0) {
            console.log(id_classroom);
            socket.join(id_classroom);

            //console.log(clsDB);
            // const sessionCls = new SessionClassroom({
            //   classroom: clsDB[0]._id,
            //   isLogged: true,
            //   userName: socket.username,
            //   userId: socket.userID,
            // });

            // await sessionCls.save();
          } else {
            socket.disconnect();
          }
        }
      });
    } catch (error) {
      console.error(error);
      socket.disconnect();
    }
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("userDisconnect", socket.userID);

      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
        idClassroom: sessionData.idClassroom,
      });
    }
  });
});
