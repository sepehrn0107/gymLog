import request from 'supertest';
import server from '../server'; 
import User from '../models/User';
import Session from '../models/session';
import Exercise from '../models/exercise';

let userId = '';
let sessionId = '';
let exerciseId = '';

beforeAll(async () => {
  // Create a user before the tests
  const user = await request(server)
    .post('/api/users/register')
    .send({
      name: 'sessionTestUser',
      email: 'sessionTestUser@user.com',
      password: 'testpassword',
      sessions: []
    });
  expect(user.status).toBe(201);
  userId = user.body._id;

  // Create an exercise before the tests
  const exercise = await request(server)
    .post(`/api/exercise/create/user/${userId}`)
    .send({
      name: 'Exercise4',
      about: 'This is a test exercise',
      body_part: 'Chest',
      category: 'Barbell'
    });
  expect(exercise.status).toBe(201);
  exerciseId = exercise.body._id;
});

afterAll(async () => {
  // Delete the user and exercise after the tests
  await User.deleteOne({ email: 'sessionTestUser@user.com' });
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
    sessionId = '';
  }
  if (exerciseId) {
    await Exercise.deleteOne({ _id: exerciseId });
    exerciseId = '';
  }
  server.close();
});

test('should create a new session with exercises', async () => {
  const session = await request(server)
    .post(`/api/session/user/${userId}`)
    .send({
      name: "Morning Workout",
      date: {
        start: "2022-01-01T06:00:00.000Z",
        end: "2022-01-01T07:00:00.000Z"
      },
      type: "Strength",
      note: "This is a test session",
      exercises: [
        {
          exercise: exerciseId,
          sets: [
            {
              repetitions: 10,
              rpe: 7,
              type_of_set: "Working"
            },
            {
              repetitions: 8,
              rpe: 6,
              type_of_set: "Warmup"
            }
          ]
        }
      ]
    });
  expect(session.status).toBe(201);
  sessionId = session.body._id;
});