import { UsersModel } from "../users/usersModel.js";

export async function initializeDb() {
  const adminUser = {
    name: 'admin',
    email: 'admin@dilfoods',
    password: 'admin123',
    role: 'ADMIN'
  };
  const staffUser = {
    name: 'staff',
    email: 'staff@dilfoods',
    password: 'staff123',
    role: 'STAFF'
  };
  const customerUser = {
    name: 'customer',
    email: 'customer@dilfoods',
    password: 'customer123',
    role: 'CUSTOMER'
  };
  [adminUser, staffUser, customerUser].map(async (user) => {
    const existingUser = (await UsersModel.find({name: user.name}))[0];
    if (!existingUser) {
      const modelUser = new UsersModel(user);
      const createdUser = await modelUser.save();
      console.log("Created user:", createdUser.name);
    }
  })
}