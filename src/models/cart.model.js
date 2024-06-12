import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
  cartOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
        quantity: {
          type: Number,
          default: 0
        },
      _id: false
    } 
  ],
  cartTotal: {
    type: Number
  },
  isPurchased: {
    type: Boolean,
    default: false
  }
});

export default model('Cart', cartSchema);