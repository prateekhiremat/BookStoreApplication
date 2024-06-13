import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  orderBy: {
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
  orderTotal: {
    type: Number
  },
  isPurchased: {
    type: Boolean,
    default: false
  },
  orderPlacedDate: {
    type: Date,
    default: Date.now
  }
});

export default model('Order', orderSchema);