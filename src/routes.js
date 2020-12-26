const { Router } = require("express");

const AttendanceController = require("./controllers/attendance");
const PetController = require("./controllers/pet");

const routes = Router();

routes.get("/", (req, res) => res.send("HELLO"));

routes.get("/attendances", AttendanceController.index);
routes.get("/attendances/:id", AttendanceController.findById);
routes.post("/attendances", AttendanceController.create);
routes.patch("/attendances/:id", AttendanceController.update);
routes.delete("/attendances/:id", AttendanceController.delete);

routes.get("/pets", PetController.index);
routes.get("/pets/:id", PetController.findById);
routes.post("/pets", PetController.create);
routes.patch("/pets/:id", PetController.update);
routes.delete("/pets/:id", PetController.delete);

module.exports = routes;
