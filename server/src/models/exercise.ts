import mongoose, { Schema } from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  about: {
    type: String,
    required: false,
    unique: false,
    max_length: 500
  },
  body_part: {
    type: String,
    required: true,
    enum: ['Chest', 'Upper back', 'Lower back', 'Arms', 'Legs', 'Core'] 
  },
  category: {
    type: String,
    required: true,
    enum: ['Barbell', 'Dumbbell', 'Cables', 'Machine', 'Bodyweight', 'Cardio', 'Duration', 'Repetitions'], 
  }

});



const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;