const EmployeeModel = require("../models/Employee");

// Define the register function
async function registerUser(req, res) {
  try {
    console.log(req);
    const newEmployee = await EmployeeModel.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  registerUser,
};
