const evenRoute = require("./event-routes")

module.exports = (app) => {
  app.use("/api/event", evenRoute)
}