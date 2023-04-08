import { populateOrderWithItems } from "../orders/ordersCtrl.js";
import { OrdersModel } from "../orders/ordersModel.js";

export const myOrdersCtrl = {
  find: async (req, res) => {
    const userId = req.user._id;
    try {
      const orders = await OrdersModel.find({ userId }).sort({createdAt: -1});
      const populatedOrders = await populateOrderWithItems(orders);
      res.json(populatedOrders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
