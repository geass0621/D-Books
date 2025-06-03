import { Router } from 'express';
import { deleteBook, getAdminOrders, postBook, patchOrderStatus, updateBook, deleteOrder } from '../controllers/admin';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/admin/book', isAuth, postBook);
router.delete('/admin/book/:bookId', isAuth, deleteBook);
router.put('/admin/book/:bookId', isAuth, updateBook);
router.get('/admin/orders', isAuth, getAdminOrders);
router.patch('/admin/orders/:orderId', isAuth, patchOrderStatus);
router.delete('/admin/orders/:orderId', isAuth, deleteOrder);

export default router