import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let userRegistrationToken;
let adminRegistrationToken;
let userLoginToken;
let bookId;

describe('User APIs Test', () => {
  beforeAll((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('User Registration', () => {

    it('should not register user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          fullName: 'Prateek S Hiremath',
          phoneNumber: '123456789',
          email: 'prateek123@gmail.com',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should not register user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          fullName: 'Prateek S Hiremath',
          phoneNumber: '1234567890',
          email: '',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should register user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          fullName: 'Prateek S Hiremath',
          phoneNumber: '1234567890',
          email: 'prateek.s.hiremath123@gmail.com',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        userRegistrationToken = res.body.token;
    });
  });

  describe('Admin Registration', () => {

    it('should not register admin', async () => {
      const res = await request(app)
        .post('/api/users/admin')
        .send({
          fullName: 'Vibhav S Hiremath',
          phoneNumber: '123456789',
          email: 'vibhav.s.hiremath123@gmail.com',
          password: 'Vibhan@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should not register admin', async () => {
      const res = await request(app)
        .post('/api/users/admin')
        .send({
          fullName: 'Vibhav S Hiremath',
          phoneNumber: '123456789',
          email: 'vibhav.s.hiremath123@gmail.com',
          password: 'Vibhan@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should register admin', async () => {
      const res = await request(app)
        .post('/api/users/admin')
        .send({
          fullName: 'Vibhav S Hiremath',
          phoneNumber: '1234567890',
          email: 'vibhav.s.hiremath123@gmail.com',
          password: 'Vibhan@123'
        })
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        adminRegistrationToken = res.body.token;
    });
  });

  describe('User Email Verification', () => {
    it('should verify email and crate user', async () => {
      const res = await request(app)
        .post('/api/users/verify')
        .set('Authorization', `Bearer ${userRegistrationToken}`)
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it('should verify email and should not crate user', async () => {
      const res = await request(app)
        .post('/api/users/verify')
        .set('Authorization', `Bearer `)
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should verify email and crate admin', async () => {
      const res = await request(app)
        .post('/api/users/verify')
        .set('Authorization', `Bearer ${adminRegistrationToken}`)
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });
  });

  describe('User Login', () => {
    it('should not login user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'unknown@gmail.com',
          password: 'Unknown@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should not login user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: '',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should login user', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'vibhav.s.hiremath123@gmail.com',
          password: 'Vibhan@123'
        })
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        userLoginToken = res.body.token;
    });
  });

  describe('Adding Book', () => {
    it('should add book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          "bookName": "One For All",
          "author": "Stew Smith",
          "description": "Destruction of World",
          "price": "100",
          "discountPrice": "20",
          "quantity": "10"
        })
        .set('Authorization', `Bearer ${userLoginToken}`)
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        bookId = res.body.bookId;
    });

    it('should add book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          "bookName": "One For All",
          "author": "Stew Smith",
          "description": "Destruction of World",
          "price": "100",
          "discountPrice": "20",
          "quantity": "10"
        })
        .set('Authorization', '')
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });
  });

  describe('Get all Books', () => {
    it('should get all books', async () => {
      const res = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${userLoginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should not fetch all books', async () => {
      const res = await request(app)
        .get('/api/books')
        .set('Authorization', '')
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });
  });

  describe('Get Book', () => {
    it('should get book', async () => {
      const res = await request(app)
        .get(`/api/books/${bookId}`)
        .set('Authorization', `Bearer ${userLoginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should not fetch book', async () => {
      const res = await request(app)
        .get(`/api/books/${bookId}`)
        .set('Authorization', '')
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });
  });

  describe('Update Book', () => {
    it('should update book', async () => {
      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .send({
          "bookName": "All for One",
          "description": "Manga",
        })
        .set('Authorization', `Bearer ${userLoginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
  });

  describe('Delete Book', () => {
    it('should delete book', async () => {
      const res = await request(app)
        .get(`/api/books/${bookId}`)
        .set('Authorization', `Bearer ${userLoginToken}`)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
  });
  
});
