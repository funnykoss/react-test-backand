const { User } = require("../models");
const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Invalid token");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw new NotFound("Not found");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
