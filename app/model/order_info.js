'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const OrderInfoSchema = new Schema({
    order_id: { type: Number, required: true },
    goods_id: { type: Number, required: true },
    num: { type: Number, default: null  },
    actual_price: { type: Number, required: true, default: null  },
    actual_fee: { type: Number, required: true, default: null  },
    is_deleted: { type: Number, default: 0, required: true },
    create_time: { 
      type: Date, 
      default: Date.now, 
      required: true,
      get(val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    modify_time: { 
      type: Date, 
      default: Date.now, 
      required: true,
      get(val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }      
    }
  },
  {
    versionKey: false
  }
);

  OrderInfoSchema.index({ order_id: 1 },{name: 'key_order_id' });
  OrderInfoSchema.index({ goods_id: 1 },{name: 'key_goods_id'});

  OrderInfoSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  OrderInfoSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('OrderInfo', OrderInfoSchema, 'order_info');
};
