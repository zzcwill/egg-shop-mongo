'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const Decimal128 = mongoose.Schema.Types.Decimal128;

  const RoleSchema = new Schema({
    name: { type: String, required: true },
    role_code: { type: String, required: true },
    note: { type: String },
    status: { type: Number, default: 1, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  RoleSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('Role', RoleSchema, 'role');
};
