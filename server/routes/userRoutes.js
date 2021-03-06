import express from 'express';
import validate from '../middlewares/validate';
import db from '../controllers/dbcontroller';
import loginValidate from '../middlewares/loginValidate';

const router = express.Router();
router.post( '/signup', validate, db.create );
router.post( '/signin', loginValidate, db.login );
export default router;
