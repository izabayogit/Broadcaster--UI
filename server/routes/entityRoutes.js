import express from 'express';
import multer from 'multer';
import Entity from '../controllers/entityControllers';
import Verify from '../middlewares/auth';
import entityValidate from '../middlewares/entityValidate';
import dbentry from '../controllers/dbentryController'
const router = express.Router();
const upload = multer({ dest: 'upload/' });
const pathy = upload.array('files', 4);
router.post( '/red-flags', Verify.userData, pathy, entityValidate, dbentry.create );
export default router;
