const Attendance = require("../models/attendance");

module.exports = {
  index: (req, res) => {
    Attendance.index()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  findById: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Attendance.findById(parsedId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  create: (req, res) => {
    const attendance = req.body;

    Attendance.create(attendance)
      .then((result) => res.status(201).json(result))
      .catch((err) => res.status(400).json(err));
  },

  update: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    const values = req.body;

    Attendance.update(parsedId, values)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  delete: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Attendance.delete(parsedId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },
};
