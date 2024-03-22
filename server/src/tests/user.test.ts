import request from 'supertest';
import server from '../server'; 
import User from '../models/User';

afterAll(async () => {
  await User.deleteOne({ email: 'test@user3.com' });
  server.close();
});

let userId = '';

test('should create a new user and log in', async () => {
  const response = await request(server)
    .post('/api/users') // Assuming your UserController defines the route as '/api/users'
    .send({
      name: 'Test User3',
      email: 'test@user3.com',
      password: 'testpassword',
      sessions: [] // Assuming your User schema has a 'sessions' field
    });
  expect(201);
  userId = response.body._id;

  console.log(userId);
  // Log in
  const loginResponse = await request(server)
    .post('/api/users/login')
    .send({
      email: 'test@user3.com',
      password: 'testpassword'
    });

  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body.user._id).toBe(userId);

  // Assert that the database was updated correctly
  const user = await User.findById(response.body._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    name: 'Test User3',
    email: 'test@user3.com',
    sessions: [] // Assert that the 'sessions' field was correctly saved
  });
  expect(user?.password).not.toBe('testpassword'); // Assuming your User schema hashes the password before saving
});

test('should log out a user', async () => {
  // Assuming you have a user with this email in your database
  const email = 'test@user3.com';

  // Log in the user first to get the userId
  const loginResponse = await request(server)
    .post('/api/users/login')
    .send({
      email: email,
      password: 'testpassword'
    });

  expect(loginResponse.status).toBe(200);
  userId = loginResponse.body.user._id;

  // Log out the user
  const logoutResponse = await request(server)
    .post('/api/users/logout')
    .send({
      userId: userId
    });

  expect(logoutResponse.status).toBe(200);
  expect(logoutResponse.body.message).toBe('Logged out successfully');
});