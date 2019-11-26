/* eslint-disable max-len */
import User from '../models/userModel';
import generateToken from '../helpers/token';

let userArray = [];
class UserController {
 static findUser = (id) => {
    return userArray.find( ( user ) => user.id == id );
  }

  static createAccount = ( req, res ) => {
    const id = userArray.length + 1;
    const {
      firstName, lastName, email, password, username, phoneNumber,

    } = req.body;
    const checkUser = userArray.find( ( user ) => user.email === email );
    if ( checkUser ) {
      return res.status( 409 ).send( {
        status: 409,
        error: `${email} already exist`,
      } );
    }
    const userAccount = new User( id, firstName, lastName, email, password, username, phoneNumber, false );
    userArray.push( userAccount );
    const tokenData = generateToken( id, email );
    return res.status( 201 ).send( {
      status: 201,
      message: 'user created successfully',
      data: {
        id: userAccount.id,
        token: tokenData,
      },
    } );
  }

  static signin = ( req, res ) => {
    const { email, password } = req.body;

    const checkLogin = userArray.find( ( userLogin ) => userLogin.email === email && userLogin.password === password );

    if ( !checkLogin ) {
      return res.status( 401 ).send( {
        status: 401,
        error: 'incorrect username or password',
      } );
    }

    const token = generateToken( checkLogin.id, checkLogin.email );
    return res.status( 200 ).send( {
      status: 200,
      message: 'user loged in successfully',
      data: {
        id: checkLogin.id,
        token,
      },
    } );
  }
}

export default UserController;
