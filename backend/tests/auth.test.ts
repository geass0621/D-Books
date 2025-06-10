/// <reference types="mocha" />
import app from '../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';


describe('Auth Endpoints', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_TEST || process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/d-books-test');
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should not register with invalid email', async () => {
    const res = await request(app)
      .put('/signup')
      .send({ email: 'bad', password: '12345678', confirmPassword: '12345678' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
  });

  it('should not register with short password', async () => {
    const res = await request(app)
      .put('/signup')
      .send({ email: 'unitTest@Test.com', password: '123', confirmPassword: '123' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body.errors).length.to.be.greaterThan(0);
    expect(res.body.errors[0]).to.include('Password must be alphanumeric and between 8 and 20 characters!');
    expect(res.body.success).to.be.false;
  });

  it('should not register with too long password', async () => {
    const res = await request(app)
      .put('/signup')
      .send({ email: 'unitTest@Test.com', password: '123456789012345678901234567890', confirmPassword: '123456789012345678901234567890' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body.errors).length.to.be.greaterThan(0);
    expect(res.body.errors[0]).to.include('Password must be alphanumeric and between 8 and 20 characters!');
    expect(res.body.success).to.be.false;
  });

  it('should not register with non-matching passwords', async () => {
    const res = await request(app)
      .put('/signup')
      .send({ email: 'unitTest@Test.com', password: '12345678', confirmPassword: '87654321' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body.errors).length.to.be.greaterThan(0);
    expect(res.body.errors[0]).to.include('Passwords do not match!');
    expect(res.body.success).to.be.false;
  });

  it('should not register with existing email', async () => {
    // First, register the user
    await request(app)
      .put('/signup')
      .send({ email: 'unitTest@Test.com', password: '12345678', confirmPassword: '12345678' });
    // Then, try to register again with the same email
    const res = await request(app)
      .put('/signup')
      .send({ email: 'unitTest@Test.com', password: '12345678', confirmPassword: '12345678' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body.errors).length.to.be.greaterThan(0);
    expect(res.body.errors[0]).to.include('Email already exists!');
    expect(res.body.success).to.be.false;
  });
});