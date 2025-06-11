/// <reference types="mocha" />
import app from '../../src/server';
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('Books Endpoints', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_TEST || process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/d-books-test');
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should fetch books with pagination', async () => {
    const res = await request(app)
      .get('/books')
      .query({ page: '1', limit: '10' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('books');
    expect(res.body.books).to.be.an('array');
    expect(res.body.books.length).to.be.greaterThan(0);
    expect(res.body).to.have.property('totalBooks');
    expect(res.body).to.have.property('totalPages');
    expect(res.body).to.have.property('currentPage');
  });

  it('should fetch a single book by ID', async () => {
    const bookId = '68484d2460d9a5fdd0811e03'; // Replace with a valid book ID from your test database
    const res = await request(app)
      .get(`/books/${bookId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('book');
    expect(res.body.book).to.have.property('id', bookId);
  });

  it('should return 404 for non-existing book ID', async () => {
    const res = await request(app)
      .get('/books/68484d2460d9a5fdd0811e04'); // Replace with a non-existing book ID

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Book not found!');
    expect(res.body).to.have.property('success', false);
  });

  it('should fetch books by genre', async () => {
    const res = await request(app)
      .get('/books')
      .query({ genre: 'romance', page: '1', limit: '10' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('books');
    expect(res.body.books).to.be.an('array');
    expect(res.body.books.length).to.be.greaterThan(0);
    res.body.books.forEach((book: any) => {
      expect(book).to.have.property('genre', 'romance');
    });
  });
});