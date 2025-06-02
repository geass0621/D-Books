import { Router } from "express";
import { getOrders } from "../controllers/order";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get('/orders', isAuth, getOrders)

export default router;