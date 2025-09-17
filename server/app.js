require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require('cors')


const port = 3001;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://5.129.250.62",
  "5669833-jq41137.twc1.net",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.static('../client/dist'))

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);


mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
