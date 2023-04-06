import { UsersModel } from "./usersModel.js";

export const usersCtrl = {
  find: async (req, res) => {
    try {
      const users = await UsersModel.find({...req.query}).select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    let user;
    try {
      user = await UsersModel.findById(req.params.id).select('-password');
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(user)
  },

  create: async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new UsersModel({
      name,
      email,
      password,
      role
    });
    try {
      const createdUser = await user.save();
      res.status(200).json(createdUser);
    } catch (e) {
      res.status(400).json({
        success: false,
        message: 'Error creating user',
        error: e.message
      });
    }
  },

  update: async (req, res) => {
    let user;
    try {
      user = await UsersModel.findById(req.params.id);
      if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await user.set(req.body).save();
    res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    let user;
    try {
      user = await UsersModel.deleteOne({_id: req.params.id});
      if (user == null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}