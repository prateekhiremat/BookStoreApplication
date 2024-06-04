import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const userRegisterValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required().pattern(/^[0-9]+$/).length(10),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
      .message(
        'password must contain atleast 8 character with one special, number, upper & lowercase character'
      )
      .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  } else {
    next();
  }
};
