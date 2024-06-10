import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addBook = async (req, res) => {
    try {
      const bookId = await BookService.addBook(req.body);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Book added successfully',
        bookId
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const getBook = async (req, res) => {
    try {
      const book = await BookService.getBook(req.params._id);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Book found successfully',
        book
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const deleteBook = async (req, res) => {
    try {
      await BookService.deleteBook(req.params._id);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const updateBook = async (req, res) => {
    try {
      await BookService.updateBook(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Book updated successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `${error}`
      });
    }
};

export const getAllBook = async (req, res) => {
  try {
    const book = await BookService.getAllBook();
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Books fetched successfully',
      book
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};