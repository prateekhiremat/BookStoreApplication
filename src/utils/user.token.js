import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const secretRegistrationKey = process.env.SECRET_REGISTRATION_KEY;

export async function generateRegistrationToken(userEmail) {
  const payload = {
    email: userEmail
  };
  return await jwt.sign(payload, secretRegistrationKey, { expiresIn: '5m' });
}