const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const {loginBrute, getUserLimit} = require("../middlewares/blockIP.js");
const tokenValidationHandler = require("../middlewares/tokenValidationHandler.js");
const authController = new AuthController();

router.post("/sign-up", authController.register);

router.post("/login", loginBrute.prevent, authController.signIn);

router.get("/protected", tokenValidationHandler, authController.protectedApi);

router.get("/users", getUserLimit.prevent, authController.getUsers);

module.exports = router;
