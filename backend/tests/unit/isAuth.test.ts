import { isAuth } from '../../src/middleware/isAuth';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { expect } from 'chai';

describe('isAuth middleware', () => {
  let req: any;
  let res: any;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    process.env.USER_JWT_SECRET = 'testsecret';
    req = { cookies: {}, headers: {} };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.spy();
  });

  it('should call next and set req.userId if JWT is valid', () => {
    const fakeUserId = '12345';
    const token = jwt.sign({ userId: fakeUserId, role: 'user' }, process.env.USER_JWT_SECRET as string);
    req.cookies.token = token;
    isAuth(req, res, next);
    expect(next.calledOnce).to.be.true;
    expect(req.userId).to.equal(fakeUserId);
    expect(req.role).to.equal('user');
  });

  it('should return 401 if no token is present', () => {
    try {
      isAuth(req, res, next);
      expect.fail('Expected error to be thrown');
    } catch (err: any) {
      expect(err.message).to.equal('Not authenticated');
      expect(err.statusCode).to.equal(401);
      expect(next.called).to.be.false;
    }

  });

  it('should return 401 if token is invalid', () => {
    req.cookies.token = 'invalidtoken';
    try {
      isAuth(req, res, next);
      expect.fail('Expected error to be thrown');
    } catch (err: any) {
      expect(err.message).to.equal('Not authenticated');
      expect(err.statusCode).to.equal(401);
      expect(next.called).to.be.false;
    }
  });

});
