import { OrdersModel } from "./ordersModel.js";

export const ordersCtrl = {
  find: async (req, res) => {
    try {
      const orders = await OrdersModel.find({ ...req.query });
      res.json(orders);
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
      res.status(400).json({
        success: false,
        message: 'Error creating order',
        error: e.message
      });
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
