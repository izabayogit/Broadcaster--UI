import Joi from 'joi';

const loginValidate = ( req, res, next ) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min( 8 ).required(),
  };

  const login = Joi.validate( req.body, schema );
  if ( login.error ) {
    return res.status( 400 ).send( {
      status: 400,
      error: `${login.error.details[0].message}`,
    } );
  }
  next();
};

export default loginValidate;
