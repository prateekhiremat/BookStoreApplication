import express from 'express';
import * as userController from '../controllers/user.controller';
import { userRegisterValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { adminRole, userRole } from '../utils/user.role';

const router = express.Router();

router.post('', userRegisterValidator, userRole, userController.userRegistration);

router.post('/admin', userRegisterValidator, adminRole, userController.userRegistration);

export default router;
