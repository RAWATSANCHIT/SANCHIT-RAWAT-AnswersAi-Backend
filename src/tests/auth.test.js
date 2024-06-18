const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }, 10000);

    afterAll(async () => {
        await mongoose.connection.close();
    }, 10000);

    it('should login a user', async () => {
        const user = new User({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });
        await user.save();

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
    });
});