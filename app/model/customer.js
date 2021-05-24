'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const CustomerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    status: { type: Number, default: 1, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  CustomerSchema.index({ name: 1 }, { unique: true, name: 'ukey_name' });

  CustomerSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('Customer', CustomerSchema, 'customer');
};
