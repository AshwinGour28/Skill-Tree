import * as userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ msg: 'Registered successfully', user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req.body);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.userId, req.body);
    res.json({ msg: 'Profile updated', user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
