import { Router } from 'express';
import { getBooks, getBook } from '../controllers/books';


const router = Router();


router.get('/books', getBooks);
router.get('/books/:bookId', getBook);


export default router;