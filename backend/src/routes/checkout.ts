import { Router } from "express";
import { postOrder, postPayment } from "../controllers/order";
import { isAuth } from "../middleware/isAuth";


const router = Router();

router.post('/checkout/order', isAuth, postOrder);
router.post('/checkout/payment', isAuth, postPayment);


export default router;