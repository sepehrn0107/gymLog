# gymLog
## Getting started
to get started, follow this guide: https://blog.100jsprojects.com/post/crafting-a-mern-stack-application-with-tailwind-css-and-typescript--a-step-by-step-guide
* brew tap mongodb/brew
* brew install mongodb-community@7.0
* npm install --save-dev @babel/preset-env @babel/preset-typescript @babel/core babel-jest

# Server
## jwt Token when creating user/logging in example:
```
{
    "id": "65fdf67199a2fdb14b3b9596",
    "email": "t7@t7.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmRmNjcxOTlhMmZkYjE0YjNiOTU5NiIsImVtYWlsIjoidDdAdDcuY29tIiwiaWF0IjoxNzExMTQyNTEzLCJleHAiOjE3MTEyMjg5MTN9.jSZpUg6SZ7DxqbZ221EgOw8eSDjjez0MtiklzPHE22M"
} 
```
# Schema
## User
```
 name: String
 email: String
 password: String (bcypt)
 sessions: [session]
 loggedIn: Boolean
 ```
## Exercise
```
 user: User
 name: String
 about: String max:500
 body_part: String, enum: ['Chest', 'Upper back', 'Lower back', 'Arms', 'Legs', 'Core']
 category: String, enum: ['Barbell', 'Dumbbell', 'Cables', 'Machine', 'Bodyweight', 'Cardio', 'Duration', 'Repetitions']
 ```
## Session
```
 user: User
 name: String
 date: {
  start: Date,
  end: Date,
  total: Date (optional)
}
 type: String, enum: ['Strength', 'Cardio']
 note: String max_length:500
 exercises: [{
  ExerciseId,
  sets: [{
    repetitions: Number,
    type_of_set: String enum ['Warmup', 'Working', 'Failure']
  }]
}]
```