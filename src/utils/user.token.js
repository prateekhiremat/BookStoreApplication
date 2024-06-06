import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const secretRegistrationKey = process.env.SECRET_REGISTRATION_KEY;
const secretLoginKey = process.env.SECRET_LOGIN_KEY;

export async function generateRegistrationToken(userEmail) {
  const payload = {
    email: userEmail
  };
  return await jwt.sign(payload, secretRegistrationKey, { expiresIn: '5m' });
}

export async function generateLoginToken(userId, role) {
  const payload = {
    _id: userId,
    role
  };
  return await jwt.sign(payload, secretLoginKey, { expiresIn: '1d' });
}