import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  bookName: {
    type: String,
    unique: true
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  discountPrice: {
    type: Number
  },
  quantity: {
    type: Number
  },
  bookImage: {
    type: String
  }
});

export default model('Book', bookSchema);