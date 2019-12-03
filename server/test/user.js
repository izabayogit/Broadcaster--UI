import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import user from '../models/db';
import generateToken from '../helpers/token';


const { expect } = chai;
chai.use(chaiHttp);

const newUser = {
  firstName: 'izabayo',
  lastName: 'jonas',
  email: 'izabayojonas@gmail.com',
  password: 'jonas123',
  username: 'izabayojonas',
  phoneNumber: '0785208449',
};

const wrongUser = {
  firstName: '',
  lastName: 'jonas',
  email: 'izabayojonas@gmail.com',
  password: 'jonas123',
  username: 'izabayojonas',
  phoneNumber: '0785208449',
};

const invalidUser = {
  firstName: 'izabayo',
  lastName: 'jonas',
  email: 'amakuru@gmail.com',
  password: 'jonas123',
  username: 'izabayojonas',
  phoneNumber: '0785208449',
};

describe( ' sign up', () => {
  before('clear a database', (done) => {
    chai.request(server);
    user.execute('DELETE FROM users');
    done();
  });
  it('should return successfully', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('user created successfully');
        expect(res.body.data).to.be.an('object');
        done();
      });
  } );
  it('should return error email already exist', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal(`Key (email)=(${newUser.email}) already exists.`);
        done();
      });
  } );
  it('should return error for wrong user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(wrongUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
      });
  } );
});
