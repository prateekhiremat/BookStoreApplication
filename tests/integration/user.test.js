import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let userRegistrationToken;
let adminRegistrationToken;
let userLoginToken;

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
          email: 'prateek.s.hiremath123@gmail.com',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        userLoginToken = res.body.token;
    });
  });
  
});
