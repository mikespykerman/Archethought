const chai = require('chai');
const expect = chai.expect;

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../app');

//const accountsMock = './mocks/accounts.json';

describe('Account Model', () => {
  chai.request(app)
    .post('/api/v1/authentication/login')
    .send({
        'email': 'mikespykerman@gmail.com',
        'password': 'letmein'
    })
    .end((err, res) => {
      console.log('this runs the login part');
      //res.body.should.have.property('token');
      //var token = res.data.token;
      console.log(res)
    })
})