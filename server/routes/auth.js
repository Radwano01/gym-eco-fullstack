const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");

const express = require("express")
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email/:email/:verification", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:email/:verification", resetPassword);

module.exports = {
  router
}
