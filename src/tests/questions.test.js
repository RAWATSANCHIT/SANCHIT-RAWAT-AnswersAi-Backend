const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Question = require('../models/Question');

describe('Question Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const user = new User({ name: 'Sanchit', email: 'sanchit@example.com', password: 'password123' });
    await user.save();
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000);

  it('should create a new question', async () => {
    const user = await User.findOne({ email: 'sanchit@example.com' });
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .post('/api/questions')
      .set('x-auth-token', token)
      .send({
        question: 'Name top LLM models right now !'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('answer');
  });
});