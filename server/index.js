const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const EmployeeModel = require("./models/Employee");

const { registerUser } = require("./backend_requests/userManagement");
const HelperFunctions = require("./backend_requests/webscrapping");
const {
  createJobSearchQuery,
} = require("./backend_requests/createJobSearchQuery");

const app = express();
app.use(cors());
app.use(express.json());

/*app.use(
  cors({
    origin: function (origin, callback) {
      // Replace 'http://localhost:3000' with your actual origin or a list of allowed origins
      const allowedOrigins = ["http://localhost:5173"];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS" + " origin is " + origin));
      }
    },
    credentials: true,
  })
); */

mongoose.connect("mongodb://127.0.0.1:27017/database-test");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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

app.post("/submitKeywordResult", (req, res) => {
  console.log("Query Request received from the backend");
  console.log(req.body);
});

app.post("/register", registerUser);

app.post("/submitWebScrappingQuery", createJobSearchQuery);

app.listen(3001, () => {
  console.log("server is running");
});
