import { OrdersModel } from "../orders/ordersModel.js";

export const myOrdersCtrl = {
  find: async (req, res) => {
    const userId = req.user._id;
    console.log(req.user);
    console.log(userId);
    try {
      const orders = await OrdersModel.find({ userId }).sort({createdAt: -1});
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
