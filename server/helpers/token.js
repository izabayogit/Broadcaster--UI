import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateToken = ( id, email, username ) => {
  const token = jwt.sign( {
    userId: id,
    userEmail: email,
    userUsername: username,
  }, process.env.password, { expiresIn: '1d' } );
  return token;
};

export default generateToken;
