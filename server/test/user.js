import chai from 'chai';
import fs from 'fs';
import path from 'path'
import chaiHttp from 'chai-http';
import server from '../index';
import user from '../models/db';
import generateToken from '../helpers/token';
import { mocks, values, text }  from '../helpers/testingdata'

const { expect } = chai;
chai.use(chaiHttp);

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
      .send(mocks.newUser)
      .end((err, res) => {
        const testid = res.body.data.id;
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
      .send(mocks.newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal(`Key (email)=(${mocks.newUser.email}) already exists.`);
        done();
      });
  } );
  it('should return error for wrong user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('accept', 'application/json')
      .send(mocks.wrongUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
      });
  } );
});

describe( ' sign in', () => {
  it('should return successfully', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(mocks.logUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user loged in successfully');
        expect(res.body.data).to.be.an('object');
        done();
      });
  } );
  it('should return error incorrect email or password', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(mocks.wrongLodin)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('incorrect email or password');
        done();
      });
  } );
  it('should return error for wrong user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('accept', 'application/json')
      .send(mocks.emptyUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('"email" is not allowed to be empty');
        done();
      });
  } );
});

const token = generateToken(0, mocks.wrongUser.email )
const userToken = generateToken(20, 'izabayotoken@gmail.com' )
describe('token',()=>{
  before('clear a database', (done) => {
    chai.request(server);
    user.execute(text, values);
    done();
  });
    it ( 'verification',(done)=>{
        chai.request(server)
        .post('/api/v2/red-flags')
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

  before('clear a database', (done) => {
    chai.request(server);
    user.execute(text, values);
    done();
  });

  it('should signup a user', (done) => {
    chai.request(server)
        .post('/api/v2/red-flags')
        .set('Content-Type', 'application/form-data')
        .set('token', userToken)
        .field('title', 'flood in kirehe')
        .field('location', '-1.23345756, 2.5677888')
        .field('status', 'pending')
        .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/1.png')), '1.png')
        .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/2.png')), '2.png')
        .field('comment', 'we want you to intervene')
        .end( (err, res) => {
            if (err) {
              console.log(err)
            } else {
              expect(res.status).to.equal(400);
              expect(res.body.error).to.equal('please fill the form correctly');
            }
            done();
        });
    });
    it('should return successful after creating red-flags', (done) => {
        chai.request(server)
            .post('/api/v2/red-flags')
            .set('Content-Type', 'application/form-data')
            .set('token', userToken)
            .field('title', 'flood in kirehe')
            .field('type', 'red-flag')
            .field('location', '-1.23345756, 2.5677888')
            .field('status', 'pending')
            .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/1.png')), '1.png')
            .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/2.png')), '2.png')
            .field('comment', 'we want you to intervene')
            .end( (err, res) => {
                if (err) {
                  console.log(err)
                } else {
                  expect(res.status).to.equal(201);
                  expect(res.body.message).to.equal('red-flag created successfully');
                }
                done();
            });
        });
        it('should return successful after creating red-flags', (done) => {
          chai.request(server)
              .post('/api/v2/red-flags')
              .set('Content-Type', 'application/form-data')
              .set('token', userToken)
              .field('title', 'flood in kirehe')
              .field('type', 'red-flag')
              .field('location', '-1.23345756, 2.5677888')
              .field('status', 'pending')
              .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/1.png')), '1.png')
              .field('comment', 'we want you to intervene')
              .end( (err, res) => {
                  if (err) {
                    console.log(err)
                  } else {
                    expect(res.status).to.equal(500);
                   expect(res.body.error).to.be.an('String');
                  }
                  done();
              });
          });
  
            it('should signup a user', (done) => {
    chai.request(server)
        .post('/api/v2/red-flags')
        .set('Content-Type', 'application/form-data')
        .set('token', userToken)
        .field('title', 'flood in kirehe')
        .field('location', '-1.23345756, 2.5677888')
        .field('status', 'pending')
        .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/1.png')), '1.png')
        .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/2.png')), '2.png')
        .field('comment', 'we want you to intervene')
        .end( (err, res) => {
            if (err) {
              console.log(err)
            } else {
              expect(res.status).to.equal(400);
              expect(res.body.error).to.equal('please fill the form correctly');
            }
            done();
        });
    });
    it('should return error when red-flags does not exist', (done) => {
      chai.request(server)
          .patch('/api/v2/red-flags/0')
          .set('Content-Type', 'application/form-data')
          .set('token', userToken)
          .field('title', 'flood in kirehe')
          .field('type', 'red-flag')
          .field('location', '-1.23345756, 2.5677888')
          .field('status', 'pending')
          .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/1.png')), '1.png')
          .attach('files', fs.readFileSync(path.join(__dirname, '../../../Broadcaster--UI/upload/2.png')), '2.png')
          .field('comment', 'we want you to intervene')
          .end( (err, res) => {
              if (err) {
                console.log(err)
              } else {
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('red-flag with a given id was not found');
              }
              done();
          });
      });




      it('should return all red-flags', (done) => {
        chai.request(server)
            .get('/api/v2/red-flags')
            .set('token', userToken)
            .end( (err, res) => {
                if (err) {
                  console.log(err)
                } else {
                  expect(res.status).to.equal(200);
                 expect(res.body).to.be.an('object')
                }
                done();
            });
        });  



        it('should return one red-flags', (done) => {
          chai.request(server)
              .get('/api/v2/red-flags/0')
              .set('token', userToken)
              .end( (err, res) => {
                  if (err) {
                    console.log(err)
                  } else {
                    expect(res.status).to.equal(404);
                   expect(res.body.error).to.equal('red-flag with a given ID was not found')
                  }
                  done();
              });
          });  

          it('should return one red-flags', (done) => {
            chai.request(server)
                .delete('/api/v2/red-flags/0')
                .set('token', userToken)
                .end( (err, res) => {
                    if (err) {
                      console.log(err)
                    } else {
                      expect(res.status).to.equal(404);
                     expect(res.body.error).to.equal('red-flag with a given ID was not found')
                    }
                    done();
                });
            }); 
  });

