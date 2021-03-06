'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const GoodsSchema = new Schema({
    id: { type: Number, required: true },
    goods_code: { type: String, required: true },
    goods_price: { type: String, default: null  },
    goods_size: { type: String, default: null  },
    goods_brand: { type: String, default: null  },
    goods_color: { type: String, default: null  },
    goods_cost_price: { type: String, default: null  },
    goods_trade_price: { type: String, default: null  },
    goods_sex: { type: Number, default: 1, required: true },
    goods_note: { type: String, default: null  },
    goods_images: { type: Array, default: null },
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

  GoodsSchema.index({ goods_code: 1, goods_color:1, goods_sex:1}, { unique: true, name: 'key_goods_code' });

  GoodsSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  GoodsSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('Goods', GoodsSchema, 'goods');
};
