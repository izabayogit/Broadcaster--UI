
import express from 'express';
import multer from 'multer';
import Verify from '../middlewares/auth';
import entityValidate from '../middlewares/entityValidate';
import dbentry from '../controllers/dbentryController';

const router = express.Router();
const upload = multer({ dest: 'upload/' });
const pathy = upload.array('files', 4);
router.post( '/red-flags', Verify.userData, pathy, entityValidate, dbentry.create );
router.patch('/red-flags/:id', Verify.userData, pathy,entityValidate, dbentry.update );
router.get('/red-flags', Verify.userData, dbentry.getAll);
router.get('/red-flags/:id', Verify.userData, dbentry.getOne);
router.delete('/red-flags/:id', Verify.userData, dbentry.delete);
router.patch('/admin/:id', Verify.userData, Verify.admin, dbentry.adminUpdate);
export default router;

