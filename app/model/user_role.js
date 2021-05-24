'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const UserRoleSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    role_id: { type: ObjectId, required: true },
    create_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true },
  });

  UserRoleSchema.index({ user_id: 1 }, { name: 'key_user_id' });
  UserRoleSchema.index({ role_id: 1 }, { name: 'key_role_id' });

  UserRoleSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  return mongoose.model('UserRole', UserRoleSchema, 'user_role');
};
