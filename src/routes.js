const { Router } = require("express");

const AttendanceController = require("./controllers/attendance");

const routes = Router();

routes.get("/", (req, res) => res.send("HELLO"));

routes.get("/attendances", AttendanceController.index);
routes.get("/attendances/:id", AttendanceController.findById);
routes.post("/attendances", AttendanceController.create);
routes.patch("/attendances/:id", AttendanceController.update);
routes.delete("/attendances/:id", AttendanceController.delete);

module.exports = routes;
