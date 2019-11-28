import jwt from 'jsonwebtoken';
import multer from 'multer';
import dotenv from 'dotenv';
import user from '../controllers/userControllers';

dotenv.config();

class Verify {
 userData = ( req, res, next ) => {
   try {
     const token = req.header( 'token' );
     if ( !token ) {
       return res.status( 404 ).send( {
         status: 404,
         error: 'please provide token',
       } );
     }
     const tokenData = jwt.verify( token, process.env.password );
     const User = user.findUser( tokenData.userId);
     if (!User) {
       return res.status( 404 ).send( {
         status: 404,
         error: 'user with this token does not exist ',
       } );
     }
     req.currentuser = User.id;
     next();
   } catch (error) {
     return res.status( 401 ).send( {
       status: 401,
       error: `you do not have access to this service ${error} `,
     } );
   }
 }
}
export default new Verify();
