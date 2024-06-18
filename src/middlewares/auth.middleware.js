import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const passport = require('passport');

const secretRegistrationKey = process.env.SECRET_REGISTRATION_KEY;
const secretLoginKey = process.env.SECRET_LOGIN_KEY;

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuthVerification = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Please Register Once Again'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { email } = await jwt.verify(bearerToken, secretRegistrationKey);
    req.email = email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Please Register Once Again'
      };
    bearerToken = bearerToken.split(' ')[1];

    await jwt.verify(bearerToken, secretLoginKey);
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const adminVerification = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Please Register Once Again'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { role } = await jwt.verify(bearerToken, secretLoginKey);
    if(role !== 'admin')
      throw new Error('Unauthorized Access')
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const cartVerification = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Please Register Once Again'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { _id } = await jwt.verify(bearerToken, secretLoginKey);
    req.body._id = _id;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const customerDetailsAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user  = await jwt.verify(bearerToken, secretLoginKey);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  passport.authenticate('google', async (err, user) => {
    console.log('err',err);
    console.log('user',user)
    if (err) {
      throw new Error('Authentication failed');
    }
    if (!user) {
      throw new Error('User not authenticated');
    }
    res.locals.email = user.email;
    next();
  })(req, res, next);
};