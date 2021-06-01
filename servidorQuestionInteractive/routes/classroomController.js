const express = require("express");

let app = express();

let Classroom = require("../models/Classroom");

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

//===========================
// Create new classroom
//===========================
app.post("/classroom", async (req, res) => {
  try {
    const classroom = new Classroom(req.body);

    classroom.id_classroom = getRandomArbitrary(145265, 626565);

    await classroom.save();

    res.json({
      valid: true,
      message: "Sala de clase creada correctamente",
      data: { idClass: classroom.id_classroom },
    });
  } catch (error) {
    res.status(500).json({
      valid: false,
      message: "Hubo un error",
      data: null,
    });
  }
});

//===========================
// Search classroom
//===========================
app.get("/classroom/:id", async (req, res) => {
  try {
    const idClassroom = req.params.id;

    let classRoom = await Classroom.findOne({ id_classroom: idClassroom });

    if (!classRoom) {
      return res.status(404).json({
        valid: false,
        message: "No se encontró ninguna clase",
        data: null,
      });
    }

    res.status(200).json({
      valid: true,
      message: "Clase encontrada",
      data: classRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      valid: false,
      message: "Hubo un error",
      data: null,
    });
  }
});

module.exports = app;
