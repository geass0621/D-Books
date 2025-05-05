import express from 'express';
import bookRoutes from './routes/books';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bookRoutes);

mongoose
  .connect(process.env.MONGO_CONNECTION || '')
  .then(() => {
    console.log('connected');
    app.listen(3000);
  })
  .catch(err => console.log(err));
