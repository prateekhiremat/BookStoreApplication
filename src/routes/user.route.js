import express from 'express';
import * as userController from '../controllers/user.controller';
import { userLoginValidator, userRegisterValidator } from '../validators/user.validator';
import { userAuthVerification } from '../middlewares/auth.middleware';
import { adminRole, userRole } from '../utils/user.role';

const router = express.Router();

router.post('', userRegisterValidator, userRole, userController.userRegistration);

router.post('/admin', userRegisterValidator, adminRole, userController.userRegistration);

router.post('/verify', userAuthVerification, userController.userVerification)

router.post('/login', userLoginValidator, userController.userLogin)

export default router;
