import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/db';

dotenv.config();
class Verify {
  admin = (req, res, next) => {
    const { status } = req.currentUser;
    if (status !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'you are not an admin',
      });
    }
    next();
  }

 userData = async ( req, res, next ) => {
   try {
     const token = req.header( 'token' );
     if ( !token ) {
       return res.status( 404 ).json( {
         status: 404,
         error: 'please provide token',
       } );
     }
     const tokenData = jwt.verify( token, process.env.password );

     const findAllQuery = 'SELECT * FROM users where id = $1';

     const { rows } = await db.execute(findAllQuery, [tokenData.userId]);
     if (!rows[0]) {
       return res.status( 404 ).json( {
         status: 404,
         error: 'user with this token does not exist ',
       } );
     }
     req.currentuser = rows[0].firstname;
     next();
   } catch (error) {
     return res.status( 401 ).json( {
       status: 401,
       error: `you do not have access to this service ${error} `,
     } );
   }
 }
}
export default new Verify();
