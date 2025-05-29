import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";
import { syncCart } from "../controllers/cart";

const router = Router();

router.post('/checkout', isUserAuth, syncCart);

export default router;