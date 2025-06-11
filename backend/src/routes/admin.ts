import { Router } from 'express';
import { deleteBook, getAdminOrders, postBook, patchOrderStatus, updateBook, deleteOrder } from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';
import { body } from 'express-validator';
import isAdmin from '../middleware/isAdmin';

const router = Router();

router.post('/admin/book', isAuth, isAdmin, [
  body('name').notEmpty().withMessage('Book name is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('discount').isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
], postBook);

router.delete('/admin/book/:bookId', isAuth, isAdmin, deleteBook);

router.put('/admin/book/:bookId', isAuth, isAdmin, [
  body('name').notEmpty().withMessage('Book name is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('discount').isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
], updateBook);

router.get('/admin/orders', isAuth, isAdmin, getAdminOrders);

router.patch('/admin/orders/:orderId', isAuth, isAdmin, [
  body('status').notEmpty().withMessage('Order status is required').isIn(['pending', 'shipped', 'delivered', 'cancelled'])
], patchOrderStatus);

router.delete('/admin/orders/:orderId', isAuth, isAdmin, deleteOrder);

export default router