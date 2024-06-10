import Book from '../models/book.model'

export const addBook = async (body) => {
    const book = await Book.findOne({ bookName: body.bookName });
    if (book !== null)
        throw new Error('Book with this name already exist')
    const newBook = await Book.create(body);
    return newBook._id;
}

export const getBook = async (_id) => {
    const book = await Book.findOne({ _id });
    if (book === null)
        throw new Error('Book does not exist');
    return book;
}

export const deleteBook = async (_id) => {
    const book = await Book.findOne({ _id });
    if (book === null)
        throw new Error('Book does not exist');
    await Book.findOneAndDelete({ _id });
}

export const updateBook = async (_id, body) => {
    const book = await Book.findOne({ _id });
    if (book === null)
        throw new Error('Book does not exist');
    await Book.findOneAndUpdate({ _id }, body, {new: true});
}

export const getAllBook = async () => {
    const book = await Book.find();
    if (book === null)
        throw new Error('Book does not exist');
    return book;
}