'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ShopSchema = new Schema({
    name: { type: String },
    note: { type: String },
    status: { type: Number, default: 1, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  ShopSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('Shop', ShopSchema, 'shop');
};
