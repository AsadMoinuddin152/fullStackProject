const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectToMongoDb = require("./config/mongo.js");
const userRoutes = require("./routes/userRoutes");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running smoothly 👌" });
});

module.exports = app;
