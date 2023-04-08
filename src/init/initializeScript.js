import { UsersModel } from "../users/usersModel.js";

export async function initializeDb() {
  const adminUser = {
    name: 'admin',
    email: 'admin@dilFoods',
    password: 'admin123',
    role: 'ADMIN'
  };
  const staffUser = {
    name: 'staff',
    email: 'staff@dilFoods',
    password: 'staff123',
    role: 'STAFF'
  };
  const customerUser = {
    name: 'customer',
    email: 'customer@dilFoods',
    password: 'customer123',
    role: 'CUSTOMER'
  };
  [adminUser, staffUser, customerUser].map(async (user) => {
    const existingUser = (await UsersModel.find({name: user.name}))[0];
    if (!existingUser) {
      const modelUser = new UsersModel(user);
      const createdUser = await modelUser.save();
      console.log("User createed", createdUser.name);
    }
  })
}