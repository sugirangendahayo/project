import express from "express";
import { placeOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/place-order", placeOrder);

export default router;
