import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (data) => {
  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName || !email || !password) {
    throw new Error('All fields are required');
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  return {
    id: savedUser._id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export const updateProfile = async (userId, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  if (!updatedUser) throw new Error('User not found');

  return {
    id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
  };
};
