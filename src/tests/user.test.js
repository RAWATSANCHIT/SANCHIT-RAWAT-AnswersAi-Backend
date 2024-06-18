const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000);

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Sanchit',
        email: 'sanchit+2@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should get a user by ID', async () => {
    const user = await User.findOne({ email: 'sanchit+2@example.com' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get(`/api/users/${user.id}`)
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Sanchit');
  });
});