import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc....Create new orders
//@route ... POST /api/orders
// @access ....private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    entity,
    cpf_cnpj,
    shippingAddress,
    shippingPrice,
    orderedAt,
    isAproved,
    buildResult,
    isDelivered,
    deliveredAt,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Pedido sem itens');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      entity,
      cpf_cnpj,
      shippingAddress,
      shippingPrice,
      orderedAt,
      isAproved,
      buildResult,
      isDelivered,
      deliveredAt,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc....Get order By ID
//@route ... GET /api/orders/:id
// @access ....private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Pedido não encontrado');
  }
});
//@desc....Updated order to paid
//@route ... GET /api/orders/:id/build
// @access ....private
const updateOrderToBuild = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isAproved = true;
    order.buildAt = Date.now();
    order.buildResult = {
      status: req.body.status,
      update_time: req.body.update_time,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Pedido não encontrado');
  }
});
//@desc....Updated order to Delivered
//@route ... GET /api/orders/:id/deliver
// @access ....private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Pedido não encontrado');
  }
});
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
// @desc    Get all user orders
// @route   GET /api/orders/
// @access  private/admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

const createOrderItem = asyncHandler(async (req, res) => {
  const orderItem = new OrderItems({
    name: 'Nome da Criança',
    age: 0,
    product: req.product._id,
    medA: 0,
    medB: 0,
    medC: 0,
    medD: 0,
    medE: 0,
    medF: 0,
  });
  const createdOrderItem = await orderItem.save();
  res.status(201).json(createdOrderItem);
});

const updateOrderItem = asyncHandler(async (req, res) => {
  const { name, age, medA, medB } = req.body;
  const orderItem = await OrderItems.findById(req.params.id);
  if (orderItem) {
    orderItem.name = name;
    orderItem.age = age;
    orderItem.medA = medA;
    orderItem.medB = medB;
    orderItem.medC = medC;
    orderItem.medD = medD;
    orderItem.medE = medE;
    orderItem.medF = medF;

    const updatedOrderItem = await orderItem.save();
    res.json(updatedOrderItem);
  } else {
    res.status(404);
    throw new Error('Item não encontrado');
  }
});

const createAddress = asyncHandler(async (req, res) => {
  const shippingAddress = new ShippingAddress({
    address: 'Rua Nome da Rua, 123',
    city: 'Nome da Cidade',
    state: 'Estado',
    postalCode: '12.000-00',
  });
  const createdAddress = await shippingAddress.save();
  res.status(201).json(createdAddress);
});

const updateAddress = asyncHandler(async (req, res) => {
  const { address, city, state, postalCode } = req.body;
  const shippingAddress = await ShippingAddress.findById(req.params.id);
  if (shippingAddress) {
    shippingAddress.address = address;
    shippingAddress.city = city;
    shippingAddress.state = state;
    shippingAddress.postalCode = postalCode;

    const updatedAddress = await shippingAddress.save();
    res.json(updatedAddress);
  } else {
    res.status(404);
    throw new Error('Endereço não encontrado');
  }
});

export {
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
};
