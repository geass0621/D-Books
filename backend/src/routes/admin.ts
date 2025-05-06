import { Router } from 'express';
import { deleteBook, postBook, updateBook } from '../controllers/admin';

const router = Router();

router.post('/admin/book', postBook);
router.delete('/admin/book/:bookId', deleteBook);
router.put('/admin/book/:bookId', updateBook)

export default router