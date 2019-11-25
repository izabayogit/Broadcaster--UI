import express from 'express';
import bodyParse from 'body-parser';
import userRoute from './routes/userRoutes';
import entityRoute from './routes/entityRoutes';


const app = express();
app.use( bodyParse.json() );
app.use( '/api/v1/auth', userRoute );
app.use( '/api/v1/auth', entityRoute );


const port = 4000;
app.listen( port, () => console.log( `server is running on port ${port}...` ) );

export default app;
