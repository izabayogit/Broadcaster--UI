import Joi from 'joi';

const entityValidate = ( req, res, next ) => {
  try {
    const { files } = req;
     const productImage = files[0].path;
    const videos = files[1].path;
  
  const items={
    title: req.body.title,
    type: req.body.type,
    location: req.body.location,
    status: req.body.status,
    images:[productImage],
    videos: [videos]
  }
  
    const schema = {
      
      title: Joi.string().required(),
      type: Joi.string().required(),
      location:Joi.string().required(),   
      status: Joi.string().required(),
      comment: Joi.string().min( 20 ).max( 1500 ),
      images:Joi.array().items(Joi.string()),
      videos: Joi.array().items(Joi.string())
    };
    const result = Joi.validate( items, schema );
    if ( result.error ) {
      return res.status( 400 ).send( {
        status: 400,
        error: 'please fill the form correctly',
      } );
    }
    next();
  } catch (error) {
    return res.status(500).send( {
      status: 500,
      error: `error accurred ${error}`,
    } );
  }
 
};

export default entityValidate;
