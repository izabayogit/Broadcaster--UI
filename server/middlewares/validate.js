import Joi from 'joi';

const validate = ( req, res, next ) => {
  const schema = {
    firstName: Joi.string().min( 5 ).max( 50 ).required(),
    lastName: Joi.string().min( 5 ).max( 50 ).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min( 8 ).required(),
    username: Joi.string().min( 10).max( 255 ).required(),
    phoneNumber: Joi.number().min(10),
  };
  const result = Joi.validate( req.body, schema );
  if ( result.error ) {
    return res.status( 400 ).send( {
      status: 400,
      error: `${result.error.details[0].message}`,
    } );
  }
  next();
};


export default validate;
