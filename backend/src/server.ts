import express from 'express';
import bookRoutes from './routes/books';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import checkoutRoutes from './routes/checkout';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { defaultErrorResponse } from './middleware/defaultErrorResponse';
import { allowCORS } from './middleware/allowCORS';
import cookieParser from 'cookie-parser';
import { postPaymentConfirmation } from './controllers/order';
import cartRoutes from './routes/cart';
import ordersRoutes from './routes/orders';

const app = express();

app.post('/checkout/webhook', express.raw({ type: 'application/json' }), postPaymentConfirmation);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(allowCORS);
app.use(adminRoutes);
app.use(authRoutes)
app.use(bookRoutes);
app.use(checkoutRoutes);
app.use(cartRoutes);
app.use(ordersRoutes);
app.use(defaultErrorResponse);

mongoose
  .connect(process.env.MONGO_CONNECTION || '')
  .then(() => {
    console.log('connected');
    const server = app.listen(3000);
  })
  .catch(err => console.log(err));
