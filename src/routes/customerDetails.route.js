import express from 'express';
import * as customerDetailsController from '../controllers/customerDetails.controller'
import { customerDetailsAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('', customerDetailsAuth, customerDetailsController.customerDetails);

export default router;