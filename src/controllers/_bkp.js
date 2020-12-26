const Pet = require("../models/pet");

module.exports = {
  index: (req, res) => {
    res.send("ok");
  },

  create: (req, res) => {
    const pet = req.body;

    Pet.create(pet, res);
  },
};
