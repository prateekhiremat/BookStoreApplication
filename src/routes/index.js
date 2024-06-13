import express from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishListRoute from './wishlist.route';
import orderRoute from './order.route';
import customerDetailsRoute from './customerDetails.route';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/carts', cartRoute);

  router.use('/wishLists', wishListRoute);

  router.use('/orders', orderRoute);

  router.use('/customerDetails', customerDetailsRoute);

  return router;
};

export default routes;
