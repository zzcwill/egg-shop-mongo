'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ShopSchema = new Schema({
    id: { type: Number, required: true  },
    name: { type: String, default: null  },
    note: { type: String, default: null  },
    status: { type: Number, default: 1, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  ShopSchema.index({ id: 1 }, { name: 'key_id' });

  ShopSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  ShopSchema.set('toObject', { virtuals: true });

  return mongoose.model('Shop', ShopSchema, 'shop');
};
