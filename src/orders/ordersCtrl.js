import { OrdersModel } from "./ordersModel.js";
import {MenuItemsModel} from "../menuItems/menuItemsModel.js";

export const ordersCtrl = {
  find: async (req, res) => {
    try {
      const orders = await OrdersModel.find({ ...req.query }).sort({createdAt: -1});
      const populatedOrders = await populateOrderWithItems(orders);
      res.json(populatedOrders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    let order;
    try {
      order = await OrdersModel.findById(req.params.id);
      if (order == null) {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(order)
  },

  create: async (req, res) => {
    const { items, userId, totalPrice } = req.body;
    const status = "pending";
    const order = new OrdersModel({
      items,
      status,
      userId,
      totalPrice
    });
    try {
      const createdOrder = await order.save();
      res.status(200).json(createdOrder);
    } catch (e) {
      res.status(400).json({message: e.message});
    }
  },

  update: async (req, res) => {
    let order;
    try {
      order = await OrdersModel.findById(req.params.id);
      if (order == null) {
        return res.status(404).json({ message: 'Order not found' });
      }
      const updatedOrder = await order.set(req.body).save();
      res.json(updatedOrder);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    let order;
    try {
      order = await OrdersModel.deleteOne({ _id: req.params.id });
      if (order == null) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export async function populateOrderWithItems(orders) {
  const newOrders = [];
  for (const order of orders) {
    const newItems = [];
    for (const item of order.items) {
      const menuItem = await MenuItemsModel.findById(item.menuItemId);
      newItems.push(menuItem);
    }
    const newOrder = {totalPrice: order.totalPrice, items: newItems, _id: order._id, userId: order.userId, status: order.status, createdAt: order.createdAt};
    newOrders.push(newOrder)
  }
  return newOrders
}