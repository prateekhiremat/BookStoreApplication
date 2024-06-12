import Wishlist from '../models/wishlist.model';
import BookModel from '../models/book.model';

export const getWishlist = async (wishListOwner) => {
  const wishlist = await wishList(wishListOwner);
  if(wishlist === null)
    throw new Error('Empty WishList')
  return wishlist;
};

export const toggleWishList = async (wishListOwner, bookId) => {
  let wishlist = await wishList(wishListOwner);
  let book = await BookModel.findOne({_id: bookId});
  if(book === null)
    throw new Error('Book not found');
  if (!wishlist) {
    wishlist = new Wishlist({ wishListOwner, books: [] });
  }

  let bookIndex = wishlist.books.findIndex(book => book.bookId.equals(bookId))

  if (bookIndex === -1) {
    wishlist.books.push({ bookId });
  }
  else{
    wishlist.books.splice(bookIndex, 1);
  }
  await wishlist.save();
  return await wishList(wishListOwner);
};

const wishList = async (wishListOwner) => {
  return await Wishlist.findOne({ wishListOwner }).populate({
    path: 'books.bookId',
    select: 'bookName author description price discountPrice bookImage'
  });
}