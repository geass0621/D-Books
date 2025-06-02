import { Router } from "express";
import { getCart, postSyncCart, postValidateCart } from "../controllers/cart";
import { isAuth } from "../middleware/isAuth";


const router = Router();

router.get('/cart', isAuth, getCart);
router.post('/cart/validate', isAuth, postValidateCart)
router.post('/cart/sync', isAuth, postSyncCart);

export default router;