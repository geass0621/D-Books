import { Router } from "express";
import { postOrder, postPayment } from "../controllers/order";
import { isAuth } from "../middleware/isAuth";
import { body } from "express-validator";


const router = Router();

router.post('/checkout/order', isAuth, [
  body('shippingAddress')
    .notEmpty()
    .withMessage('Shipping address is required!'),
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email!')
    .normalizeEmail(),
  body('phone')
    .notEmpty()
    .isNumeric()
    .withMessage('Phone number must be numeric and not empty!'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required in the order!'),
], postOrder);
router.post('/checkout/payment', isAuth, postPayment);


export default router;