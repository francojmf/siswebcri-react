import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  createOrderItem,
  updateOrderItem,
  createAddress,
  updateAddress,
  getOrderById,
  updateOrderToBuild,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/myorders/item').post(protect, createOrderItem);
router.route('/myorders/item').put(protect, updateOrderItem);
router.route('/myorders/address').post(protect, createAddress);
router.route('/myorders/address/:id').put(protect, updateAddress);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/order').put(protect, updateOrderToBuild);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
