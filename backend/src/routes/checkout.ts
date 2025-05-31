import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";
import { getCart, syncCart } from "../controllers/cart";


const router = Router();

router.post('/checkout', isUserAuth, syncCart);
router.get('/checkout', isUserAuth, getCart);

export default router;