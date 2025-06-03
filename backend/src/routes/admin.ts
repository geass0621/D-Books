import { Router } from 'express';
import { deleteBook, getAdminOrders, postBook, updateBook } from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/admin/book', isAuth, postBook);
router.delete('/admin/book/:bookId', isAuth, deleteBook);
router.put('/admin/book/:bookId', isAuth, updateBook);
router.get('/admin/orders', isAuth, getAdminOrders);

export default router