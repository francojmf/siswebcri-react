import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        age: { type: Number, required: true },
        medA: { type: Number, required: true },
        medB: { type: Number, required: true },
        medC: { type: Number, required: true },
        medD: { type: Number, required: true },
        medE: { type: Number, required: true },
        medF: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    entity: {
      type: String,
      required: true,
    },
    cpf_cnpj: {
      type: String,
      required: true,
    },
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isAproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    buildResult: {
      status: { type: String },
      updateTime: { type: Date },
    },
    orderedAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
