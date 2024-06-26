import User from '../models/user.model';
import bcrypt from 'bcrypt'
import { getUserCredentials, userRegisterCache } from '../utils/user.redis_cache';
import sendMail from '../utils/user.email';
import { generateLoginToken, generateRegistrationToken } from '../utils/user.token';

export const userRegistration = async (body) => {
  body.email = body.email.toLowerCase()
  const user = await User.findOne({email: body.email})
    if(user !== null)
      throw new Error('User Already Registered');
  const hashedPassword = await bcrypt.hash(body.password, 5);
  body.password = hashedPassword;
  userRegisterCache(body);
  const token = await generateRegistrationToken(body.email)
  const subject = 'Please Click here to Verify';
  const message = `<h1>http://localhost:5000/api/users/verify</h1>\n${token}`;
  sendMail(body.email, subject, message);
  return token;
};

export const userVerification = async (email) => {
  const userDetails = await getUserCredentials(email);
  await User.create(userDetails);
}

export const userLogin = async (body) => {
  body.email = body.email.toLowerCase();
  const user = await User.findOne({ email: body.email })
  if (user === null) 
    throw new Error('Invalid email');
  const result = await bcrypt.compare(body.password, user.password,);
  if (result) {
    const token = await generateLoginToken(user._id, user.role);
    return { user, token };
  } 
  else {
    throw new Error('Invalid password');
  }
};

export const userGoogleLogin = async (email) => {
  const user = await User.findOne({ email })
  if (user === null) 
    throw new Error('Invalid email');
    const token = await generateLoginToken(user._id, user.role);
    return { user, token };
};