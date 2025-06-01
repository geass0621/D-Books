import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";
import { getCart, syncCart } from "../controllers/cart";
import { postOrder, postPayment } from "../controllers/order";


const router = Router();

router.post('/checkout', isUserAuth, syncCart);
router.get('/checkout', isUserAuth, getCart);
router.post('/checkout/order', isUserAuth, postOrder);
router.post('/checkout/payment', isUserAuth, postPayment);


export default router;