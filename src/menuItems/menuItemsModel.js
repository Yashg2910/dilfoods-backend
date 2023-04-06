import mongoose from "mongoose";
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

export const MenuItemsModel = mongoose.model('MenuItems', menuItemSchema);
