import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { cartVerification } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', cartVerification, cartController.getCart);

router.put('/:_id', cartVerification, cartController.addBookToCart);

router.delete('/:_id', cartVerification, cartController.removeBookFromCart);

export default router;