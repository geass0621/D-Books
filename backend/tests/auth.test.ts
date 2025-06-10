import app from '../src/server'; // or wherever your Express app is exported
import request from 'supertest';
import { expect } from 'chai';

describe('Auth Endpoints', () => {
  it('should not register with invalid email', async () => {
    const res = await request(app)
      .put('/signup')
      .send({ email: 'bad', password: '12345678', confirmPassword: '12345678' });
    expect(res.status).to.equal(422);
    expect(res.body).to.have.property('message');
  });
});