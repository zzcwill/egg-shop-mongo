'use strict';
const dayjs = require('dayjs')

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const ObjectId = Schema.ObjectId;
  // const Decimal128 = mongoose.Decimal128;

  const OrderSchema = new Schema({
    id: { type: Number, required: true },
    order_code: { type: String, required: true },
    customer_id: { type: Number, required: true },
    shop_id: { type: Number, required: true },
    customer_name: { type: String, required: true },
    phone: { type: String, default: null  },
    address: { type: String , default: null },
    // 1零售 2批发 3代卖
    sale_type: { type: Number, required: true },
    express_fee: { type: Number, default: 0.00, required: true },
    order_fee: { type: Number, required: true },
    order_discount_fee: { type: Number, default: 0.00, required: true },
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

  OrderSchema.index({ order_code: 1 }, {name: 'key_order_code' });

  OrderSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  OrderSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('Order', OrderSchema, 'order');
};
