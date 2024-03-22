# gymLog
## Getting started
to get started, follow this guide: https://blog.100jsprojects.com/post/crafting-a-mern-stack-application-with-tailwind-css-and-typescript--a-step-by-step-guide
* brew tap mongodb/brew
* brew install mongodb-community@7.0
* npm install --save-dev @babel/preset-env @babel/preset-typescript @babel/core babel-jest

# Schema
## User
* name: String
* email: String
* password: String (bcypt)
* sessions: [session]
* loggedIn: Boolean
## Exercise
* user: User
* name: String
* about: String max:500
* body_part: String, enum: ['Chest', 'Upper back', 'Lower back', 'Arms', 'Legs', 'Core']
* category: String, enum: ['Barbell', 'Dumbbell', 'Cables', 'Machine', 'Bodyweight', 'Cardio', 'Duration', 'Repetitions']
## Session
* user: User
* name: String
* date: {
  start: Date,
  end: Date,
  total: Date (optional)
}
* type: String, enum: ['Strength', 'Cardio']
* note: String max_length:500
* exercises: [{
  ExerciseId,
  sets: [{
    repetitions: Number,
    type_of_set: String enum ['Warmup', 'Working', 'Failure']
  }]
}]