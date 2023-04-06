import mongoose from "mongoose";

export async function init() {
  mongoose.connect('mongodb://localhost/pos-system', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to POS-system database');
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  });
}
