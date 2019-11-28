import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import generateToken from '../helpers/token'


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

const wrongUser = {
    firstName:"",
	lastName: "jonas",
	email:"izabayojonas@gmail.com",
	password:"jonas123",
	username:"izabayojonas",
	phoneNumber:"0785208449"
}

const invalidUser = {
    firstName:"izabayo",
	lastName: "jonas",
	email:"amakuru@gmail.com",
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
           expect(res.body.message).to.equal('user created successfully');
           expect(res.body.data).to.be.an('object');
           done();
       });
   } );
   it('should return successfully', (done) =>{
    chai.request(server)
    .post('/api/v1/auth/signup')
    .set('accept', 'application/json')
    .send(newUser)
    .end((err, res) =>{
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal(`${newUser.email} already exist`);
        done();
    });
} );
it('should return successfully', (done) =>{
    chai.request(server)
    .post('/api/v1/auth/signup')
    .set('accept', 'application/json')
    .send(wrongUser)
    .end((err, res) =>{
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
    });
} );
it('should return successfully', (done) =>{
    chai.request(server)
    .post('/api/v1/auth/signin')
    .set('accept', 'application/json')
    .send(newUser)
    .end((err, res) =>{
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user loged in successfully');
        done();
    });
} );

it('should return successfully', (done) =>{
    chai.request(server)
    .post('/api/v1/auth/signin')
    .set('accept', 'application/json')
    .send(invalidUser)
    .end((err, res) =>{
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('incorrect username or password');
        done();
    });
} );
}); 
const token = generateToken(0, wrongUser.email )
const userToken = generateToken(1, newUser.email )
describe('token',()=>{
    it ( 'verification',(done)=>{
        chai.request(server)
        .post('/api/v1/entry')
        .set('Content-Type', 'application/form-data')
        .set('token', token)
        .field('title', 'flood in kirehe')
        .field('type', 'red-flag')
        .field('location', '-1.23345756, 2.5677888')
        .field('status', 'pending')
        .field('comment', 'we want you to intervene')
        .end( (err, res) => {
            if (err) {
                console.log(err);
            } else {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('user with this token does not exist ');
                done();
            }
        })
    })
})

describe('     ', ()=>{
    it('should signup a user', (done) => {
        chai.request(server)
            .post('/api/v1/entry')
            .set('Content-Type', 'application/form-data')
            .set('token', userToken)
            .field('title', 'flood in kirehe')
            .field('type', 'red-flag')
            .field('location', '-1.23345756, 2.5677888')
            .field('status', 'pending')
            .field('comment', 'we want you to intervene')
            .end( (err, res) => {
                if (err) {
                    console.log(err);
                } else expect(res.status).to.equal(500);
                done();
            });
        });
})
