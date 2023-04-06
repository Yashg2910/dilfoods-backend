import express from "express";
import {init as initDb} from "./db/mongo.js";
import { registerCtrl } from "./register/registerCtrl.js";
import { registerHooks } from "./register/registerHooks.js";
import { loginCtrl } from "./login/loginCtrl.js";
import { loginHooks } from "./login/loginHooks.js";

const app = express();
const PORT = 3000;

// initialize mongodb
initDb();

app.use(express.json());

app.post('/register', registerHooks, registerCtrl.create);
app.post('/login', loginHooks, loginCtrl.create);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
