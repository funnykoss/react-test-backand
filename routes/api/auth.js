const express = require("express");
const {
  validation,
  authenticate,
  controllerWrapper,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validation(joiSchema),
  controllerWrapper(ctrl.registration),
);

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
