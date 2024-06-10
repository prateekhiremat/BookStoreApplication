import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const userRegistration = async (req, res) => {
  try {
    const token = await UserService.userRegistration(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Please Verify Your Email',
      token: `${token}`
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const userVerification = async (req, res) => {
  try {
    await UserService.userVerification(req.email);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User Registered Successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { user, token } = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      fullName: user.fullName,
      message: 'User Loggedin Successfully',
      token: `${token}`
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};