import bcrypt from "bcrypt";
import {UsersModel} from "../users/usersModel.js";

export const registerCtrl = {
  create: async (req, res) => {
    const {email, name, password, role} = req.body;
    try {
      const existingUser = await UsersModel.findOne({email});
      if (existingUser) {
        return res.status(400).json({ message: 'Email address already in use' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new UsersModel({
        name,
        email,
        password: hashedPassword,
        role
      });
  
      await user.save();
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}