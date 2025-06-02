import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";
import { getCart, postSyncCart, postValidateCart } from "../controllers/cart";


const router = Router();

router.get('/cart', isUserAuth, getCart);
router.post('/cart/validate', isUserAuth, postValidateCart)
router.post('/cart/sync', isUserAuth, postSyncCart);

export default router;