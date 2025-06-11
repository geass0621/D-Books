/// <reference types="mocha" />
import app from '../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('Admin Endpoints', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_TEST || process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/d-books-test');
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should not allow access to admin endpoint without authentication', async () => {
    const res = await request(app)
      .get('/admin/orders');
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message');
  });

  it('should allow access to admin endpoint with valid authentication', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });

    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .get('/admin/orders')
      .set('Cookie', cookie);
    expect(res.status).to.equal(200);
  });

  it('should not allow non-admin users to access admin endpoint', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({
        email: 'unittest@test.com',
        password: '12345678'
      });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .get('/admin/orders')
      .set('Cookie', cookie);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Not authenticated');
  });
});