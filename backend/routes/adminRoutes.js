import express from "express";
import getAdminData from "../controllers/adminContoller.js";

const router = express.Router();

router.get("/", getAdminData);

export default router;
