import HttpStatus from 'http-status-codes';
import * as WishListService from '../services/wishlist.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getWishList = async (req, res) => {
    try {
      const bookId = await WishListService.getWishlist(req.body._id);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'WishList fetched successfully',
        bookId
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const toggleWishList = async (req, res) => {
  try {
    const wishlist = await WishListService.toggleWishList(req.body._id, req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'WishList successfully',
      wishlist
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};