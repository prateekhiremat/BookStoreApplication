import express from 'express';
import userRoute from './user.route';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  
  /* Route to Create a User */
  router.use('/users', userRoute);

  return router;
};

export default routes;
