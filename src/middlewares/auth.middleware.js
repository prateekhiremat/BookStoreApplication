import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

const secretRegistrationKey = process.env.SECRET_REGISTRATION_KEY;

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
