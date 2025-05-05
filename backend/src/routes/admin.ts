import { Router } from 'express';
import { deleteBook, postBook } from '../controllers/admin';

const router = Router();

router.post('/admin/book', postBook);
router.delete('/admin/book/:bookId', deleteBook);

export default router