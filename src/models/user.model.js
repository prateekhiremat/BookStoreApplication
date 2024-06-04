import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    role: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
