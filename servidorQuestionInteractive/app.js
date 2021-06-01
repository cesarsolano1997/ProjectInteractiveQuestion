require("./config");
const mongoose = require("mongoose");
const express = require("express");
const io = require("socket.io"); // Configuration sokectio
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

let server = http.createServer(app);

app.use(express.json({ extended: true }));

require("./config");
require("./routes");

// Configuration global routes
app.use(require("./routes/index"));

module.exports.io = io(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});
require("./sockets/socket");

mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw err;
    console.log("Conectado a MongoDB");
  }
);

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
