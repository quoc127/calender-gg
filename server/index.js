require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://calender-gg-d9tm.vercel.app",
  "https://calender-gg-xdve.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma"
    ],
  })
);


const bodyParser = require("body-parser");
// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Databasse
const { dbConnect } = require("./config/DBconnect");
dbConnect();

// Routes
const RoutesAPIVer1 = require("./routes/index-routes");
RoutesAPIVer1(app);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;
