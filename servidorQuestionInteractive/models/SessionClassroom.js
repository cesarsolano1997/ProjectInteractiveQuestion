const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let sessionClassroomSchema = new Schema({
  userName: {
    type: String,
    required: [true, "El nombre del usuario es necesario"],
  },
  isLogged: {
    type: Boolean,
    required: [
      true,
      "Es necesario saber si está persona tiene cuenta de la app web",
    ],
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, "Es necesario la fecha y hora en el que se conectó"],
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classrooms",
    required: [true, "Es necesario el id de la clase"],
  },
});

module.exports = mongoose.model("SessionClass", sessionClassroomSchema);
