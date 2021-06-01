const { io } = require("../app");

let Classroom = require("../models/Classroom");

const MSessionClass = require("./mongo/SessionClassrom");

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const SessionClassroom = require("../models/SessionClassroom");
const sessionStore = new InMemorySessionStore();

// Configuration global
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("invalid username"));
  }

  // create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;

  next();
});

io.on("connection", (socket) => {
  console.log("Se conectó:" + socket.username, socket.sessionID);

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.username);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });

  socket.on("joinRooms", (id_classroom) => {
    try {
      Classroom.find({ id_classroom }, (err, clsDB) => {
        //console.log(clsDB);
        if (err) {
          socket.disconnect();
        } else {
          if (clsDB.length > 0) {
            socket.join(id_classroom);

            //console.log(clsDB);
            const sessionCls = new SessionClassroom({
              classroom: clsDB[0]._id,
              isLogged: false,
              userName: socket.username,
            });

            sessionCls.save();

            // for (let [id, socket] of io.of("/").sockets) {
            //   users.push({
            //     userID: id,
            //     username: socket.username,
            //   });
            // }
            // SessionClassroom.find(
            //   { classroom: clsDB[0]._id },
            //   (err, USERSDB) => {
            //     if (err) {
            //       socket.disconnect();
            //     } else {
            //       users = USERSDB.map((user) => ({
            //         userID: user._id,
            //         username: user.userName,
            //       }));

            //       console.log(1, users);
            //     }
            //   }
            // );

            MSessionClass.FindClass(clsDB[0]._id).then((users) =>
              io.sockets.in(id_classroom).emit("newUser", users)
            );
            //console.log(socket.username, users);
            //;
            socket.to(socket.userID).emit("IdSession", sessionCls._id);
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
});
