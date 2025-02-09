const express = require("express");
const route = express.Router();

const controller = require("../controller/event-controller")

route.get("/", controller.getEvents)
route.post("/add", controller.postEvent)
route.delete("/delete/:id", controller.deleteEvent)
route.patch("/update/:id", controller.updateEvent)

module.exports = route;