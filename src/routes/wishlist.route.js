import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { cartVerification } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', cartVerification, wishlistController.getWishList);

router.put('/:_id', cartVerification, wishlistController.toggleWishList);

export default router;