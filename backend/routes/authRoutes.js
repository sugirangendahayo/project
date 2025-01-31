import express from "express";
import {
  login,
  logout,
  signupAdmin,
  signupUser,
  verifyAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/check-admin", verifyAdmin);
router.post("/register-admin", signupAdmin);
router.post("/register-user", signupUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
