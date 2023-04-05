import express from "express";
import {authenticateToken} from "./authentication/authenticationMiddleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/test', authenticateToken,async (req, res) => {
  res.status(200).json({success: "True"})
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
