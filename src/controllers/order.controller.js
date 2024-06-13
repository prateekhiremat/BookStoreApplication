import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const setOrderDetails = async (req, res) => {
    try {
      const order = await OrderService.setOrderDetails(req.body._id);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Please set User details',
        link: 'http://localhost:5000/api/customerDetails',
        order
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};