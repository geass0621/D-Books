import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import isAdmin from '../../src/middleware/isAdmin';

describe('isAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    process.env.ADMIN_JWT_SECRET = 'testsecret';
    req = {
      userId: '12345',
      role: 'admin', // Simulating an admin user
    }
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.spy();
  });


  it('should call next if user is an admin', () => {
    isAdmin(req, res, next);
    expect(next.calledOnce).to.be.true;
  });
})