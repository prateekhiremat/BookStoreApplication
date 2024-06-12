import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getCart = async (req, res) => {
    try {
      const bookId = await CartService.getCart(req.body._id);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Cart fetched successfully',
        bookId
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const addBookToCart = async (req, res) => {
  try {
    const cart = await CartService.addBookToCart(req.body._id, req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Cart fetched successfully',
      cart
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const removeBookFromCart = async (req, res) => {
  try {
    const cart = await CartService.removeBookFromCart(req.body._id, req.params._id);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Cart fetched successfully',
      cart
    });
  } catch (error) {
    console.log(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};