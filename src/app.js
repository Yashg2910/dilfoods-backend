import express from "express";
import cors from "cors";
import {init as initDb} from "./db/mongo.js";
import { registerCtrl } from "./register/registerCtrl.js";
import { registerHooks } from "./register/registerHooks.js";
import { loginCtrl } from "./login/loginCtrl.js";
import { loginHooks } from "./login/loginHooks.js";
import { menuItemsCtrl } from "./menuItems/menuItemsCtrl.js";
import { menuItemsHooks } from "./menuItems/menuItemsHooks.js";
import { usersCtrl } from "./users/usersCtrl.js";
import { usersHooks } from "./users/usersHooks.js";
import { ordersCtrl } from "./orders/ordersCtrl.js";
import { ordersHooks } from "./orders/ordersHooks.js";
import { initializeDb } from "./init/initializeScript.js"
import { myOrdersCtrl } from "./my/myOrdersCtrl.js";
import { myOrdersHooks } from "./my/myOrdersHooks.js";
import { sendOtpCtrl } from "./otp/sendOtpCtrl.js";
import { verifyOtpCtrl } from "./otp/verifyOtpCtrl.js";

const app = express();
const PORT = 3007;

// initialize mongodb
initDb();

app.use(express.json());
app.use(cors());
app.post('/register', registerHooks, registerCtrl.create);
app.post('/login', loginHooks, loginCtrl.create);

// Routes for menu item
app.get('/menuItems', menuItemsHooks, menuItemsCtrl.find);
app.get('/menuItems/:id', menuItemsHooks, menuItemsCtrl.get);
app.post('/menuItems', menuItemsHooks, menuItemsCtrl.create);
app.put('/menuItems/:id', menuItemsHooks, menuItemsCtrl.update);
app.delete('/menuItems/:id', menuItemsHooks, menuItemsCtrl.remove);

// Routes for users
app.get('/users', usersHooks, usersCtrl.find);
app.get('/users/:id', usersHooks, usersCtrl.get);
app.post('/users', usersHooks, usersCtrl.create);
app.put('/users/:id', usersHooks, usersCtrl.update);
app.delete('/users/:id', usersHooks, usersCtrl.remove);

// Routes for orders
app.get('/orders', ordersHooks, ordersCtrl.find);
app.get('/orders/:id', ordersHooks, ordersCtrl.get);
app.post('/orders', ordersHooks, ordersCtrl.create);
app.put('/orders/:id', ordersHooks, ordersCtrl.update);
app.get('/my/orders', myOrdersHooks, myOrdersCtrl.find);


// Serve static uploaded files
app.use('/uploads', express.static('uploads'));

// Otp routes
app.use('/send-otp', sendOtpCtrl.create)
app.use('/verify-otp', verifyOtpCtrl.create)

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

initializeDb();