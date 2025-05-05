import { Router } from 'express';
import { postBook } from '../controllers/admin';

const router = Router();

router.post('/admin/book', postBook);

export default router