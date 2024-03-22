import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  type: {
    type: String,
    enum: ['Strength', 'Cardio'],
    required: true
  },
  note: {
    type: String
  },
  exercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    repetitions: Number,
    sets: Number,
    rpe: Number,
    type_of_set: {
      type: String,
      enum: ['warmup', 'working', 'failure'],
      required: true
    }
  }],
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;