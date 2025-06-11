/// <reference types="mocha" />
import app from '../../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';


describe('Order Endpoints', () => {

  before(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_TEST || process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/d-books-test');
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should post order', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const orderData = {
      name: 'Test User',
      email: 'unittest@test.com',
      phone: '1234567890',
      items: [
        {
          bookId: '68484cfd83c32b6136d51efa',
          quantity: 2,
          discountPrice: 120.99,
          name: 'The House of the Seven Gables',
          imageUrl: 'https://covers.openlibrary.org/b/id/8241487-L.jpg',
          price: 198.34,
          discount: 0.39,
        }
      ],
      shippingAddress: '123 Test St, Test City, TC 12345',
      totalAmount: 241.98,
    };
    const res = await request(app)
      .post('/checkout/order')
      .set('Cookie', cookie)
      .send(orderData);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Order placed successfully!');
    expect(res.body).to.have.property('orderId');
  });

  it('should not post order with invalid data', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const orderData = {
      name: '', // Invalid name
      email: '', // Invalid email
      phone: '123', // Invalid phone
      items: [],
      shippingAddress: '', // Invalid address
      totalAmount: 0, // Invalid amount
    };
    const res = await request(app)
      .post('/checkout/order')
      .set('Cookie', cookie)
      .send(orderData);
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message', 'Validation failed');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.an('array').that.is.not.empty;
  });

  it('should get user orders', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .get('/orders')
      .set('Cookie', cookie);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('orders');
    expect(res.body.orders).to.be.an('array').that.is.not.empty;
  });

  it('should not get orders without authentication', async () => {
    const res = await request(app)
      .get('/orders');
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Not authenticated');
  });

  it('should not post payment with invalid data', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const paymentData = {
      orderId: 'invalidOrderId', // Invalid order ID
      items: [], // No items
      totalAmount: 0, // Invalid amount
    };
    const res = await request(app)
      .post('/checkout/payment')
      .set('Cookie', cookie)
      .send(paymentData);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Invalid payment data.');
  });
});


