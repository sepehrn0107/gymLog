import request from 'supertest';
import server from '../server'; 
import User from '../models/User';
import Exercise from '../models/exercise';
import { createUser } from '../controllers/UserControllers';
import { response } from 'express';

let userId = ''
let exerciseId = '';
beforeAll(async () => {
  await User.updateMany({}, { loggedIn: false });
  // Create a user before the tests
  const user = await request(server)
    .post('/api/users/register') // Assuming your UserController defines the route as '/api/users'
    .send({
      name: 'Test User3',
      email: 'test@user3.com',
      password: 'testpassword',
      sessions: [] // Assuming your User schema has a 'sessions' field
    });
  expect(201);
  userId = user.body._id;
  console.log(userId)
});

afterAll(async () => {
  // Delete the user after the tests
  await User.deleteOne({ email: 'test@user3.com' });
  if (exerciseId) {
    await Exercise.deleteOne({ _id: exerciseId });
    exerciseId = '';
  }
  server.close();
});

test('should create a new exercise', async () => {
  const response = await request(server)
    .post(`/api/exercise/create/user/${userId}`)
    .send({
      name: 'Exercise1',
      about: 'This is a Exercise1',
      body_part: 'Chest',
      category: 'Barbell'
    });

  expect(response.status).toBe(201);
  expect(response.body).toMatchObject({
    user: userId,
    name: 'Exercise1',
    about: 'This is a Exercise1',
    body_part: 'Chest',
    category: 'Barbell'
  });

  // Assert that the database was updated correctly
  const exercise = await Exercise.findById(response.body._id);
  expect(exercise).not.toBeNull();

  // Save the exercise ID to delete it later
  exerciseId = response.body._id;
});
test('should get all exercises', async () => {
  const response = await request(server)
    .get('/api/exercises');
    expect(response.status).toBe(200);
})
test('should get all exercises from user', async () => {
  const response = await request(server)
    .get(`/api/exercise/user/${userId}`);
    console.log(userId);
    console.log(response.body)
    expect(response.body[0]).toMatchObject({
      user: userId,
      name: 'Exercise1',
      about: 'This is a Exercise1',
      body_part: 'Chest',
      category: 'Barbell'
    });

})

// test('should get exercises by userId', async () => {
//   const response = await request(server)
//     .get(`/api/exercise/user/${userId}`);

//   expect(response.status).toBe(200);
//   expect(Array.isArray(response.body)).toBe(true);
//   response.body.forEach((exercise: { user: any; }) => {
//     console.log('exercise user:', exercise.user);
//     expect(exercise.user).toEqual(userId);
//   });
// });