import request from 'supertest';
import server from '../server'; 
import User from '../models/user';

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(done => {
  server.close(done);
});

test('should create a new user', async () => {
  const response = await request(server)
    .post('/users')
    .send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    })
    .expect(201);

  // Assert that the database was updated correctly
  const user = await User.findById(response.body._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    name: 'Test User',
    email: 'test@example.com',
  });
  expect(user?.password).not.toEqual('testpassword');
});