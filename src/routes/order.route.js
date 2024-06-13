import express from 'express';
import * as orderController from '../controllers/order.controller';
import { cartVerification } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('', cartVerification, orderController.setOrderDetails);

export default router;