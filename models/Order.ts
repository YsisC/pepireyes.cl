import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title   : { type: String, required: true },
        size    : { type: String, required: true },
        quantity: { type: Number, required: true },
        slug    : { type: String, required: true },
        image   : { type: String, required: true },
        price   : { type: Number, required: true },
    }],
    shippingAddress: {
        firstName : { type: String, required: true },
        lastName  : { type: String, required: true },
        address   : { type: String, required: true },
        address2  : { type: String },
    
        location: {
            lat: { type: Number },
            lng: { type: Number },
            address: { type: String },
            name: { type: String },
            vicinity: { type: String },
            googleAddressId: { type: String },
          },
        city      : { type: String, required: true },
        commune   : { type: String, required: true },
        phone     : { type: String, required: true },
    },

    numberOfItems: { type: Number, required: true },
    subTotal     : { type: Number, required: true },
    delivery          : { type: Number, required: true },
    total        : { type: Number, required: true },
    status: {
        type: Number,
        default: 0,
      },
    isPaid : { type: Boolean, required: true, default: false },
    
    paidAt : { type: String },
    session_id: { type: String },
}, {
    timestamps: true,
})

const Order:Model<IOrder> = mongoose.models.Order || model('Order',orderSchema);

export default Order;