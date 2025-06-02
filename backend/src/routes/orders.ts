import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";
import { getOrders } from "../controllers/order";

const router = Router();

router.get('/orders', isUserAuth, getOrders)

export default router;