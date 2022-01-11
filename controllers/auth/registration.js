const { Conflict } = require("http-errors");
const { User } = require("../../models");

const registration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} allready exist`);
  }
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    newUser,
  });
};
module.exports = registration;
