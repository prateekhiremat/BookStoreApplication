import User from '../models/user.model';
import bcrypt from 'bcrypt'

export const userRegistration = async (body) => {
  body.email = body.email.toLowerCase()
  await User.findOne({email: body.email})
    .then(async(user) => {
      if(user !== null)
        throw new Error('User Already Registered');
      return bcrypt.hash(body.password, 5);
    })
    .then(async(hashedPassword) => {
      body.password = hashedPassword;
      await User.create(body);
    })
};
