import sinon from 'sinon';
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

  it('should return 401 if user is not authenticated', () => {
    req.userId = undefined;
    isAdmin(req, res, next);
    expect(next.calledOnce).to.be.true;
    const errorArg = next.firstCall.args[0];
    expect(errorArg).to.exist;
    expect(errorArg).to.have.property('message', 'Not authenticated');
    expect(res.status.called).to.be.false;
    expect(res.json.called).to.be.false;
  });

  it('should return 403 if user is not an admin', () => {
    req.role = 'user'; // Simulating a non-admin user
    isAdmin(req, res, next);
    expect(next.calledOnce).to.be.true;
    const errorArg = next.firstCall.args[0];
    expect(errorArg).to.exist;
    expect(errorArg).to.have.property('message', 'Not authorized');
    expect(res.status.called).to.be.false;
    expect(res.json.called).to.be.false;
  });
})