import { MenuItemsModel } from "./menuItemsModel.js";

export const menuItemsCtrl = {
  find: async (req, res) => {
    try {
      const menuItems = await MenuItemsModel.find({...req.query});
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    let menuItem;
    try {
      menuItem = await MenuItemsModel.findById(req.params.id);
      if (menuItem == null) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(menuItem)
  },

  create: async (req, res) => {
    const { name, description, price, category } = req.body;
    const {filename} = req.file;
    const menuItem = new MenuItemsModel({
      name,
      description,
      price,
      category,
      imageUrl: filename
    });
    try {
      const createdMenuItem = await menuItem.save();
      res.status(200).json(createdMenuItem);
    } catch (e) {
      res.status(400).json({
        success: false,
        message: 'Error creating menu item',
        error: e.message
      });
    }
  },

  update: async (req, res) => {
    let menuItem;
    try {
      menuItem = await MenuItemsModel.findById(req.params.id);
      if (menuItem == null) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      const updatedMenuItem = await menuItem.set(req.body).save();
      res.json(updatedMenuItem);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    let menuItem;
    try {
      menuItem = await MenuItemsModel.deleteOne({_id: req.params.id});
      if (menuItem == null) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}