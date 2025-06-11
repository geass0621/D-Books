/// <reference types="mocha" />
import app from '../../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('cart Endpoints', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_TEST || process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/d-books-test');
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should fetch user cart', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .get('/cart')
      .set('Cookie', cookie);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('cart');
    expect(res.body.cart).to.be.an('object');
    expect(res.body.cart).to.have.property('items');
  });

  it('should sync user cart', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const testCart = {
      userId: '68484d6a4a121d098b5a6951',
      userEmail: 'unittest@test.com',
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
      totalPrice: 241.98,
      totalQuantity: 2,
      isSync: false
    }
    const res = await request(app)
      .post('/cart/sync')
      .set('Cookie', cookie)
      .send(testCart);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('cart');
    expect(res.body.cart).to.be.an('object');
    expect(res.body.cart).to.have.property('items');
    expect(res.body.cart.items).to.be.an('array').that.is.not.empty;
    expect(res.body.cart.isSync).to.be.true;
  });

  it('should not sync user cart with invalid data or structure', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const invalidCart = {
      userId: 'testUserId',
      userEmail: '',
      items: [],
      totalPrice: -10, // Invalid total price
      totalQuantity: -1, // Invalid total quantity
      isSync: false
    };

    const res = await request(app)
      .post('/cart/sync')
      .set('Cookie', cookie)
      .send(invalidCart);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('should validate user cart', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const validCart = {
      userId: '68484d6a4a121d098b5a6951',
      userEmail: 'unittest@test.com',
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
      totalPrice: 241.98,
      totalQuantity: 2,
      isSync: false
    };

    // Now validate
    const res = await request(app)
      .post('/cart/validate')
      .set('Cookie', cookie)
      .send(validCart);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Cart validated successfully!');
    expect(res.body).to.have.property('cart');
    expect(res.body.cart).to.be.an('object');
    expect(res.body.cart).to.have.property('items');
    expect(res.body.cart.items).to.be.an('array').that.is.not.empty;
    expect(res.body.cart.isSync).to.be.true;
  });

  it('should not validate user cart with mismatched userId or userEmail', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const invalidCart = {
      userId: 'invalidUserId',
      userEmail: ' ',
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
      totalPrice: 241.98,
      totalQuantity: 2,
      isSync: false
    };
    const res = await request(app)
      .post('/cart/validate')
      .set('Cookie', cookie)
      .send(invalidCart);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Cart user ID or email does not match the logged-in user.');
  });

  it('should not validate user cart with mismatched book IDs', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const invalidCart = {
      userId: '68484d6a4a121d098b5a6951',
      userEmail: 'unittest@test.com',
      items: [
        {
          bookId: 'invalidBookId', // This book ID does not exist
          quantity: 2,
          discountPrice: 120.99,
          name: 'The House of the Seven Gables',
          imageUrl: 'https://covers.openlibrary.org/b/id/8241487-L.jpg',
          price: 198.34,
          discount: 0.39,
        }
      ],
      totalPrice: 241.98,
      totalQuantity: 2,
      isSync: false
    };
    const res = await request(app)
      .post('/cart/validate')
      .set('Cookie', cookie)
      .send(invalidCart);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Some book IDs in the cart are not valid.');
  }
  );

  it('should not validate user cart with mismatched total price or quantity', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'unittest@test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const invalidCart = {
      userId: '68484d6a4a121d098b5a6951',
      userEmail: 'unittest@test.com',
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
      totalPrice: 300.00, // Incorrect total price
      totalQuantity: 2,
      isSync: false

    };
    const res = await request(app)
      .post('/cart/validate')
      .set('Cookie', cookie)
      .send(invalidCart);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Cart totals do not match. Please check the cart items.');
  });
});