'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const CustomerSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, default: null  },
    address: { type: String, default: null  },
    status: { type: Number, default: 1, required: true },
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
    versionKey: false,
  }
);

  CustomerSchema.index({ name: 1 }, { unique: true, name: 'ukey_name' });

  CustomerSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  CustomerSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('Customer', CustomerSchema, 'customer');
};
