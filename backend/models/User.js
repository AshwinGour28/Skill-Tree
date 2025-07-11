import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  role: String,
  skills: [String],
});

const User = mongoose.model('User', userSchema);
export default User;
