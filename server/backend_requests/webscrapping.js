// Define the register function
async function registerUser(req, res) {
  try {
    const newEmployee = await EmployeeModel.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  registerUser,
};
