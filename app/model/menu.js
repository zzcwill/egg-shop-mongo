'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const MenuSchema = new Schema({
    menu_name: { type: String },
    url: { type: String },
    parent_id: { type: String },
    orders: { type: Number },
    logo_tag: { type: String },
    level: { type: Number },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  MenuSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('Menu', MenuSchema, 'menu');
};
