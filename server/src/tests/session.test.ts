import request from 'supertest';
import app from '../server'; // replace with your actual import

describe('Session API', () => {
  const userId = 'INSERTUSERID';
  const exerciseId = 'ExerciseID';
  const sessionData = {
    user: userId,
    name: 'Test Session',
    exercises: [exerciseId],
    date: {
      start: new Date(),
      end: new Date(),
    },
    type: 'Strength',
  };

  let sessionId: string;

  test('createSession', async () => {
    const response = await request(app)
      .post('/sessions')
      .send(sessionData);
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toEqual(userId);
    expect(response.body.exercises).toContain(exerciseId);
    sessionId = response.body._id;
  });

  test('getSessionById', async () => {
    const response = await request(app).get(`/sessions/${sessionId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toEqual(sessionId);
  });

  test('getSessionByUserId', async () => {
    const response = await request(app).get(`/sessions/user/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: sessionId })]));
  });

  test('updateSession', async () => {
    const response = await request(app)
      .put(`/sessions/${sessionId}`)
      .send({ name: 'Updated Test Session' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual('Updated Test Session');
  });

  test('deleteSession', async () => {
    const response = await request(app).delete(`/sessions/${sessionId}`);
    expect(response.statusCode).toBe(204);
  });
});