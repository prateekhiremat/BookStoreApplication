import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const bookValidation = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    discountPrice: Joi.number().min(0).required()
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

export const updatebookValidation = (req, res, next) => {
    const schema = Joi.object({
      bookName: Joi.string(),
      author: Joi.string(),
      description: Joi.string(),
      quantity: Joi.number().min(1),
      price: Joi.number().min(0),
      discountPrice: Joi.number().min(0)
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