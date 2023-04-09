import { UsersModel } from "../users/usersModel.js";
import { MenuItemsModel } from "../menuItems/menuItemsModel.js";

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
  const customerUser2 = {
    name: 'customer-2',
    email: 'customer2@dilfoods.com',
    password: 'customer123',
    role: 'CUSTOMER'
  };
  const customerUser3 = {
    name: 'customer-3',
    email: 'customer3@dilfoods.com',
    password: 'customer123',
    phone: "9999999999",
    role: 'CUSTOMER'
  };
  [adminUser, staffUser, customerUser, customerUser2, customerUser3].map(async (user) => {
    const existingUser = (await UsersModel.find({name: user.name}))[0];
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const modelUser = new UsersModel({...user, password: hashedPassword});
      const createdUser = await modelUser.save();
      console.log("Created user:", createdUser.name);
    }
  });

  const menuItemData = {
    name: "Test item 1",
    description: "Test item 1 description",
    price: 100,
    category: "snacks",
    imageUrl: "dilfoods.jpg"
  }

  const existingItem = (await MenuItemsModel.find({name: menuItemData.name}))[0];
  if (!existingItem) {
    const menuItem = new MenuItemsModel(menuItemData);
    const newItem = await menuItem.save();
  }
}