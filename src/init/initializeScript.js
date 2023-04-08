import { UsersModel } from "../users/usersModel.js";
import bcrypt from "bcrypt";

export async function initializeDb() {
  const adminUser = {
    name: 'admin',
    email: 'admin@dilfoods.com',
    password: 'admin123',
    role: 'ADMIN'
  };
  const staffUser = {
    name: 'staff',
    email: 'staff@dilfoods.com',
    password: 'staff123',
    role: 'STAFF'
  };
  const customerUser = {
    name: 'customer',
    email: 'customer@dilfoods.com',
    password: 'customer123',
    role: 'CUSTOMER'
  };
  [adminUser, staffUser, customerUser].map(async (user) => {
    const existingUser = (await UsersModel.find({name: user.name}))[0];
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const modelUser = new UsersModel({...user, password: hashedPassword});
      const createdUser = await modelUser.save();
      console.log("Created user:", createdUser.name);
    }
  })
}