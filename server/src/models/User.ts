import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
enum Role {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'superadmin'
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sessions: [{
    sessions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
    }]
  }],
  loggedIn: {
    type: Boolean,
    default: false
  },
  roles: {
    type: String,
    enum: Object.values(Role),
    default: Role.User
  }
  // other fields go here
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;