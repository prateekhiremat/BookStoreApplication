import express from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route'

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  
  /* Route to Create a User */
  router.use('/users', userRoute);

  router.use('/books', bookRoute);

  router.use('/carts', cartRoute);

  return router;
};

export default routes;
