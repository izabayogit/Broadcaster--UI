import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);

const newUser = {
    firstName:"izabayo",
	lastName: "jonas",
	email:"izabayojonas@gmail.com",
	password:"jonas123",
	username:"izabayojonas",
	phoneNumber:"0785208449"
}

describe( ' sign up',  () => {
   it('should return successfully', (done) =>{
       chai.request(server)
       .post('/api/v1/auth/signup')
       .set('accept', 'application/json')
       .send(newUser)
       .end((err, res) =>{
           expect(res.body).to.be.an('object');
           expect(res.status).to.equal(201);
           done();
       });
   } );
}); 