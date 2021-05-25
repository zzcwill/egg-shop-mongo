'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const Decimal128 = mongoose.Schema.Types.Decimal128;

  const OrderInfoSchema = new Schema({
    order_id: { type: ObjectId, required: true },
    goods_id: { type: ObjectId, required: true },
    num: { type: Number, default: null  },
    actual_price: { type: Decimal128, required: true, default: null  },
    actual_fee: { type: Decimal128, required: true, default: null  },
    is_deleted: { type: Number, default: 0, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true },
  });

  OrderInfoSchema.index({ order_id: 1 },{name: 'key_order_id' });
  OrderInfoSchema.index({ goods_id: 1 },{name: 'key_goods_id'});

  OrderInfoSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  OrderInfoSchema.set('toObject', { virtuals: true });

  return mongoose.model('OrderInfo', OrderInfoSchema, 'order_info');
};
