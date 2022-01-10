const { Conflict } = require("http-errors");
const { User } = require("../../models");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email=${email} allready exist`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};
module.exports = registration;
