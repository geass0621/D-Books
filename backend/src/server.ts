import express from 'express';
import bookRoutes from './routes/books';

const app = express();

app.use(bookRoutes);

app.listen(3000);