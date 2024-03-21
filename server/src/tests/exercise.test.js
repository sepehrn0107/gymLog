import request from 'supertest';
import app from '../app'; // import your Express app
import Exercise from '../models/Exercise';
import mongoose from 'mongoose';

beforeEach(async () => {
  await Exercise.deleteMany(); // clear the database before each test
});

afterAll(async () => {
  await mongoose.connection.close(); // close the database connection after all tests
});
test('should create a new exercise', async () => {
  const response = await request(app)
    .post('/exercise')
    .send({
      user: 'INSERTUSERID',
      name: 'Push Ups',
      about: 'A basic bodyweight exercise for upper body strength.',
      body_part: 'Chest',
      category: 'Bodyweight'
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe('Push Ups');
  expect(response.body.user).toBe('INSERTUSERID');
});
test('should get all exercises', async () => {
  const response = await request(app).get('/exercises');
  expect(response.statusCode).toBe(200);
});

test('should get an exercise by ID', async () => {
  const exercise = new Exercise({
    user: 'INSERTUSERID',
    name: 'Push Ups',
    about: 'A basic bodyweight exercise for upper body strength.',
    body_part: 'Chest',
    category: 'Bodyweight'
  });
  await exercise.save();

  const response = await request(app).get(`/exercise/${exercise._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('Push Ups');
});

test('should get exercises by body part', async () => {
  const response = await request(app).get('/exercises/bodypart/Chest');
  expect(response.statusCode).toBe(200);
});

test('should get exercises by category', async () => {
  const response = await request(app).get('/exercises/category/Bodyweight');
  expect(response.statusCode).toBe(200);
});

test('should get exercises by user', async () => {
  const response = await request(app).get('/exercises/user/INSERTUSERID');
  expect(response.statusCode).toBe(200);
});