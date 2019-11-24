import express from 'express';
import userController from '../controllers/userControllers';
import validate from '../middlewares/validate';


const router = express.Router();
router.post( '/signup', validate, userController.createAccount );
router.post( '/signin', userController.signin );

export default router;
