import express from 'express';
import multer from 'multer';
import Entity from '../controllers/entityControllers';
import Verify from '../middlewares/auth';

const router = express.Router();
const upload = multer({ dest: 'upload/' });
const pathy = upload.array('files', 4);
router.post( '/entry', Verify.userData, pathy, Entity.createEntity );
router.get('/red-flags', Verify.userData, Entity.getall);
router.get('/red-flags/:id', Verify.userData, Entity.getOne);
router.delete('/delete/red-flags/:id', Verify.userData, Entity.delete);
export default router;
