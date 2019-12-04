import express from 'express';
import bodyParse from 'body-parser';
import userRoute from './routes/userRoutes';
import entityRoute from './routes/entityRoutes';
import dotenv from 'dotenv';
import './models/db';

dotenv.config();
const app = express();
app.use( bodyParse.json() );
app.use( '/api/v2/auth', userRoute );
app.use( '/api/v2', entityRoute );


const port = process.env.PORT || 3000;
app.listen(port);
console.log('app running on port ', port);

export default app;
