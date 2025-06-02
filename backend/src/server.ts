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
import { Server } from 'socket.io';
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
    // const io = new Server(server, {
    //   cors: {
    //     origin: "http://localhost:5173",
    //     credentials: true
    //   }
    // });
    // io.on('connection', (socket) => {
    //   console.log('A user connected:', socket.id);
    // });

  })
  .catch(err => console.log(err));
