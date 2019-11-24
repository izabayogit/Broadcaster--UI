import express from 'express';
import userController from '../controllers/userControllers';
import validate from '../middlewares/validate';
// import loginValidate from '../middlewares/loginValidate';

const router = express.Router();
router.post( '/signup', validate, userController.createAccount );
// router.post( '/signin', loginValidate, userController.signin );

export default router;
