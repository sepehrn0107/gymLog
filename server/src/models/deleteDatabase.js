import mongoose from 'mongoose';
import User from './user';
import Exercise from './exercise';
import Session from './session';
mongoose.connect('mongodb://localhost:27017/your-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

async function resetDatabase() {
  await User.deleteMany({});
  await Exercise.deleteMany({});
  await Session.deleteMany({});
  console.log('Database has been reset');
}

resetDatabase().then(() => mongoose.connection.close());