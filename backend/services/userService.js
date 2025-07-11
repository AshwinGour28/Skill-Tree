import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (data) => {
  const { name, username, password } = data;

  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, password: hashedPassword });
  return await newUser.save();
};

export const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
};

export const updateProfile = async (userId, data) => {
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
  return updatedUser;
};
