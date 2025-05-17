import express from 'express';
import bookRoutes from './routes/books';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { defaultErrorResponse } from './middleware/defaultErrorResponse';
import { allowCORS } from './middleware/allowCORS';

const app = express();

app.use(bodyParser.json());
app.use(allowCORS);
app.use(adminRoutes);
app.use(authRoutes)
app.use(bookRoutes);
app.use(defaultErrorResponse);

mongoose
  .connect(process.env.MONGO_CONNECTION || '')
  .then(() => {
    console.log('connected');
    app.listen(3000);
  })
  .catch(err => console.log(err));
