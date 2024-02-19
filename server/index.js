const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const EmployeeModel = require("./models/Employee");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Replace 'http://localhost:3000' with your actual origin or a list of allowed origins
      const allowedOrigins = ["http://localhost:5173"];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/database-test");

app.post("/login", (req, res) => {
  console.log("Login request received from the backend");
  const { email, password } = req.body;
  console.log("email from backend," + email);
  console.log("password from backend," + password);
  EmployeeModel.findOne({ email: email }).then((user) => {
    console.log("I am reached");
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  console.log("Register request received from backend");
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
