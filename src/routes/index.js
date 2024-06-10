import express from 'express';
import userRoute from './user.route';
import bookRoute from './book.route'

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

  return router;
};

export default routes;
