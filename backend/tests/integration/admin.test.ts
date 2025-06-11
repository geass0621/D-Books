/// <reference types="mocha" />
import app from '../../src/server';
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
    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('message', 'Not authorized');
  });

  it('should fetch admin orders', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .get('/admin/orders')
      .set('Cookie', cookie);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('orders');
    expect(res.body.orders).to.be.an('array');
  });

  it('should add a new book', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .post('/admin/book')
      .set('Cookie', cookie)
      .send({
        name: 'Test Book',
        description: 'This is a test book.',
        genre: 'test',
        author: 'Test Author',
        price: 19.99,
        discount: 0.5,
        imageUrl: 'http://example.com/test-book.jpg'
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Book added successfully!');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('book');
    expect(res.body.book).to.have.property('name', 'Test Book');
  });

  it('should update an existing book', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];

    const book = await request(app)
      .get('/books')
      .set('Cookie', cookie)
      .query({ page: '1', limit: '1' });
    const bookId = book.body.books[0].id;
    const res = await request(app)
      .put(`/admin/book/${bookId}`)
      .set('Cookie', cookie)
      .send({
        name: 'Updated Test Book',
        description: 'This is an updated test book.',
        genre: 'test',
        author: 'Updated Test Author',
        price: 24.99,
        discount: 0.2,
        imageUrl: 'http://example.com/updated-test-book.jpg'
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Book updated!');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('book');
    expect(res.body.book).to.have.property('name', 'Updated Test Book');
  });
  it('should delete an existing book', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const book = await request(app)
      .get('/books')
      .set('Cookie', cookie)
      .query({ page: '1', limit: '1' });
    const bookId = book.body.books[0].id;
    const res = await request(app)
      .delete(`/admin/book/${bookId}`)
      .set('Cookie', cookie);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Book deleted successfully!');
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('book');
    expect(res.body.book).to.have.property('id', bookId);
  });

  it('should not delete a book that does not exist', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .delete('/admin/book/68484d2460d9a5fdd0811e04') // Replace with a non-existing book ID
      .set('Cookie', cookie);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Could not find book!');
  });

  it('should not add a book with invalid data', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const res = await request(app)
      .post('/admin/book')
      .set('Cookie', cookie)
      .send({
        name: '', // Invalid name
        description: 'This is a test book with invalid data.',
        genre: 'test',
        author: 'Test Author',
        price: 19.99,
        discount: 0, // Invalid discount
        imageUrl: 'http://example.com/test-book.jpg'
      });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.an('array');
  });

  it('should not update a book with invalid data', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'adminTest@Test.com', password: '12345678' });
    const cookie = loginRes.headers['set-cookie'];
    const book = await request(app)
      .get('/books')
      .set('Cookie', cookie)
      .query({ page: '1', limit: '1' });
    const bookId = book.body.books[0].id;
    const res = await request(app)
      .put(`/admin/book/${bookId}`)
      .set('Cookie', cookie)
      .send({
        name: '', // Invalid name
        description: 'This is an updated test book with invalid data.',
        genre: 'test',
        author: 'Updated Test Author',
        price: 24.99,
        discount: 0, // Invalid discount
        imageUrl: 'http://example.com/updated-test-book.jpg'
      });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.an('array');
  });
});