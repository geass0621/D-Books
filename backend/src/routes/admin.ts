import { Router } from 'express';
import { deleteBook, getAdminOrders, postBook, patchOrderStatus, updateBook, deleteOrder } from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';
import { body } from 'express-validator';

const router = Router();

router.post('/admin/book', isAuth, [
  body('name').notEmpty().withMessage('Book name is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('discount').isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
], postBook);

router.delete('/admin/book/:bookId', isAuth, deleteBook);

router.put('/admin/book/:bookId', isAuth, [
  body('name').notEmpty().withMessage('Book name is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('discount').isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
], updateBook);

router.get('/admin/orders', isAuth, getAdminOrders);

router.patch('/admin/orders/:orderId', isAuth, patchOrderStatus);

router.delete('/admin/orders/:orderId', isAuth, deleteOrder);

export default router