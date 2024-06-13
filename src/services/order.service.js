import bookModel from '../models/book.model';
import cartModel from '../models/cart.model';
import Order from '../models/order.model'
import { cartList } from './cart.service'

export const setOrderDetails = async (orderBy) => {
    let cartDetails = await cartList(orderBy);
    await cartModel.findByIdAndDelete(cartDetails._id)
    if(cartDetails === null || cartDetails.books.length === 0)
        throw new Error('Please add products to cart');
    for(let book of cartDetails.books){
        let updateBook = await bookModel.findById(book.bookId._id)
        updateBook.quantity -= book.quantity;
        updateBook = await bookModel.findByIdAndUpdate(updateBook._id, updateBook, { new: true });
    }
    return await Order.create({
        orderBy,
        books: cartDetails.books,
        orderTotal: cartDetails.cartTotal,
        isPurchased: true
    })
}