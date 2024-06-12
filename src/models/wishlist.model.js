import { model, Schema } from 'mongoose';

const wishListSchema = new Schema({
  wishListOwner: {
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
      _id: false
    } 
  ]
});

export default model('WishList', wishListSchema);