'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const UserRoleSchema = new Schema({
    user_id: { type: Number, required: true },
    role_id: { type: Number, required: true },
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

  UserRoleSchema.index({ user_id: 1 }, { name: 'key_user_id' });
  UserRoleSchema.index({ role_id: 1 }, { name: 'key_role_id' });

  UserRoleSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  UserRoleSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('UserRole', UserRoleSchema, 'user_role');
};
