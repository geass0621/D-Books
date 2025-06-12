import sinon from 'sinon';
import { expect } from 'chai';
import { allowCORS } from '../../src/middleware/allowCORS';

describe('allowCORS middleware', () => {
  let req: any;
  let res: any;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = { headers: {} };
    res = { setHeader: sinon.stub(), status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.spy();
  });

  it('should set CORS headers for allowed origin', () => {
    process.env.FRONTEND_URL = 'http://localhost:3000';
    req.headers.origin = 'http://localhost:3000';

    allowCORS(req, res, next);

    expect(res.setHeader.calledWith('Access-Control-Allow-Origin', 'http://localhost:3000')).to.be.true;
    expect(res.setHeader.calledWith('Access-Control-Allow-Credentials', 'true')).to.be.true;
    expect(res.setHeader.calledWith('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')).to.be.true;
    expect(res.setHeader.calledWith('Access-Control-Allow-Headers', 'Content-Type, Authorization')).to.be.true;
    expect(next.calledOnce).to.be.true;
  });

  it('should not set CORS headers for disallowed origin', () => {
    process.env.FRONTEND_URL = 'http://localhost:3000';
    req.headers.origin = 'http://disallowed-origin.com';

    allowCORS(req, res, next);

    expect(res.setHeader.calledWith('Access-Control-Allow-Origin', 'http://disallowed-origin.com')).to.be.false;
    expect(next.calledOnce).to.be.true;
  });
});