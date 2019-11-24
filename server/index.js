import express from 'express';
import bodyParse from 'body-parser';
import userRoute from './routes/userRoutes';


const app = express();
app.use( bodyParse.json() );
app.use( '/api/v1/auth', userRoute );


const port = 5000;
app.listen( port, () => console.log( `server is running on port ${port}...` ) );

export default app;
