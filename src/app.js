import express from "express";
import {init as initDb} from "./db/mongo.js";
import { registerCtrl } from "./register/registerCtrl.js";
import { registerHooks } from "./register/registerHooks.js";
import { loginCtrl } from "./login/loginCtrl.js";
import { loginHooks } from "./login/loginHooks.js";
import { menuItemsCtrl } from "./menuItems/menuItemsCtrl.js";
import { menuItemsHooks } from "./menuItems/menuItemsHooks.js";
import { usersCtrl } from "./users/usersCtrl.js";
import { usersHooks } from "./users/usersHooks.js";

const app = express();
const PORT = 3000;

// initialize mongodb
initDb();

app.use(express.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
