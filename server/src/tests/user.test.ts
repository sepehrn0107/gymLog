import request from 'supertest';
import server from '../server'; 
import User from '../models/User';

afterAll(async () => {
  await User.deleteOne({ email: 'test@user3.com' });
  server.close();
});

let userId = '';

test('should create a new user, log in and log out', async () => {
  // Create a new user
  const response = await request(server)
    .post('/api/users/register') // Assuming your UserController defines the route as '/api/users'
    .send({
      name: 'Test User3',
      email: 'test@user3.com',
      password: 'testpassword',
      sessions: [] // Assuming your User schema has a 'sessions' field
    });
  expect(201);

  // Log in
  const loginResponse = await request(server)
    .post('/api/users/login')
    .send({
      email: 'test@user3.com',
      password: 'testpassword'
    });
  userId = loginResponse.body.userID;
  expect(loginResponse.body.token).not.toBe(null);
  expect(loginResponse.body.email).toBe('test@user3.com');

  // Log out
  const logoutResponse = await request(server)
  .post(`/api/users/logout/${userId}`);
  expect(logoutResponse.status).toBe(200);
  expect(logoutResponse.body.message).toBe('Logged out successfully');

});