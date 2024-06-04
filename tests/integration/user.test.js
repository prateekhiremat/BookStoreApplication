import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

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
    it('should register user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          fullName: 'Prateek S Hiremath',
          phoneNumber: '1234567890',
          email: 'prateek.s.hiremath123@gmail.com',
          password: 'Prateek@123'
        })
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it('should not register user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          fullName: 'Prateek S Hiremath',
          phoneNumber: '123456789',
          email: 'prateek.s.hiremath123@gmail.com',
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
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });
  });
});
