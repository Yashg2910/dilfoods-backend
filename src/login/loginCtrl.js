import bcrypt from "bcrypt";
import {UsersModel} from "../users/usersModel.js";
import jwt from "../authentication/jwt.js";

export const loginCtrl = {
  create: async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await UsersModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.generateToken({ _id: user._id, name: user.name, role: user.groups }, '1h');

      return res.json({ _id: user._id, name: user.name, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}