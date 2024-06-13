import HttpStatus from 'http-status-codes';
import * as CustomerDetailsService from '../services/customerDetails.service';

  /**
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const customerDetails = async (req, res, next) => {
    try {
      const data = await CustomerDetailsService.customerDetails(res.locals.user._id,req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Details stored successfully',
        data: data
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
  };