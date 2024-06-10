import express from 'express';
import * as bookController from '../controllers/book.controller';
import { adminVerification, userAuth } from '../middlewares/auth.middleware';
import { bookValidation, updatebookValidation } from '../validators/book.validator';

const router = express.Router();

router.post('', bookValidation,adminVerification, bookController.addBook);

router.delete('/:_id', adminVerification, bookController.deleteBook);

router.put('/:_id', updatebookValidation, adminVerification, bookController.updateBook);

router.get('/:_id', userAuth, bookController.getBook);

router.get('', userAuth, bookController.getAllBook);


export default router;