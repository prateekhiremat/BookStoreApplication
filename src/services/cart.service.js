import Cart from '../models/cart.model'
import BookModel from '../models/book.model';

export const getCart = async (cartOwner) => {
    const cart = await Cart.findOne({ cartOwner }).populate({
        path: 'books.bookId',
        select: 'bookName author description price discountPrice bookImage'
    });
    if (cart === null)
        throw new Error('Cart is Empty')
    return cart;
}


export const addBookToCart = async(cartOwner, bookId) => {
    let cart = await Cart.findOne({ cartOwner }).populate({
        path: 'books.bookId',
        select: 'bookName author description price discountPrice bookImage'
    });
    let book = await BookModel.findOne({_id: bookId});
    if(book === null)
        throw new Error('Book not found');
    if(book.quantity === 0)
        throw new Error('Book out of stock');
    if(cart === null){
        cart = {
            cartOwner,
            books: [],
        }; 
        cart.books.push({bookId: book._id, quantity: 1});
        cart.cartTotal = book.discountPrice;
        return await Cart.create(cart);
    }
    let bookIndex = cart.books.findIndex(book => book.bookId.equals(bookId))
    if(bookIndex !== -1){
        if(cart.books[bookIndex].quantity === book.quantity)
            throw new Error('Out of Stock');
        cart.books[bookIndex].quantity += 1;
        cart.cartTotal += book.discountPrice;
        return await Cart.findByIdAndUpdate(cart._id, cart, {
            new: true
        });
    }else{
        cart.books.push({bookId: book._id, quantity: 1});
        cart.cartTotal += book.discountPrice;
        return await Cart.findByIdAndUpdate(cart._id, cart, {
            new: true
        });
    }
}

export const removeBookFromCart = async(cartOwner, bookId) => {
    let cart = await Cart.findOne({ cartOwner }).populate({
        path: 'books.bookId',
        select: 'bookName author description price discountPrice bookImage'
    });;
    if(cart === null){
        throw new Error('Cart is empty')
    }
    let bookIndex = cart.books.findIndex(book => book.bookId.equals(bookId));
    if(bookIndex !== -1){
        if(cart.books[bookIndex].quantity === 1){
            cart.cartTotal -= cart.books[bookIndex].bookId.discountPrice
            cart.books.splice(bookIndex, 1);
            return await Cart.findByIdAndUpdate(cart._id, cart, {
                new: true
            }
            );
        }
        cart.books[bookIndex].quantity -= 1;
        cart.cartTotal -= cart.books[bookIndex].bookId.discountPrice;
        return await Cart.findByIdAndUpdate(cart._id, cart, {
            new: true
        })
    }else{
        throw new Error('Book is not present in the cart')
    }
}