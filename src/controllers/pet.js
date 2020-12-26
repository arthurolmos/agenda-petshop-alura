const Pet = require("../models/pet");

module.exports = {
  index: (req, res) => {
    Pet.index()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  findById: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Pet.findById(parsedId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  create: (req, res) => {
    const pet = req.body;

    Pet.create(pet)
      .then((result) => res.status(201).json(result))
      .catch((err) => res.status(400).json(err));
  },

  update: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    const values = req.body;

    Pet.update(parsedId, values)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },

  delete: (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    Pet.delete(parsedId)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(400).json(err));
  },
};
