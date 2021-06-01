const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let classroomSchema = new Schema({
  nameClass: {
    type: String,
    required: [true, "El nombre de la clase es necesario"],
  },
  hour: {
    type: Date,
    required: [true, "La hora de inicio es necesario"],
  },
  id_classroom: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Classroom", classroomSchema);
