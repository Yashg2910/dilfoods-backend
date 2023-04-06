import express from "express";
import {authenticateToken} from "./authentication/authenticationMiddleware.js";
import {init as initDb} from "./db/mongo.js";
import { registerCtrl } from "./register/registerCtrl.js";
import { registerHooks } from "./register/registerHooks.js";

const app = express();
const PORT = 3000;

// initialize mongodb
initDb();

app.use(express.json());

app.get('/test', authenticateToken,async (req, res) => {
  res.status(200).json({success: "True"})
});

app.post('/register', registerHooks, registerCtrl.create);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
