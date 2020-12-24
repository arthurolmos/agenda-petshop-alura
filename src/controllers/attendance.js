const Attendance = require("../models/attendance");

module.exports = {
  index: (req, res) => {
    Attendance.index(res);
  },

  findById: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Attendance.findById(parsedId, res);
  },

  create: (req, res) => {
    const attendance = req.body;

    console.log("attendance", attendance);

    Attendance.create(attendance, res);
  },

  update: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    const values = req.body;

    Attendance.update(parsedId, values, res);
  },

  delete: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Attendance.delete(parsedId, res);
  },
};
