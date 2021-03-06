'use strict';
const dayjs = require('dayjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const RoleMenuSchema = new Schema({
    role_id: { type: Number, required: true },
    menu_id: { type: Number, required: true },
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

  RoleMenuSchema.index({ role_id: 1 },{name: 'key_role_id' });
  RoleMenuSchema.index({ menu_id: 1 },{name: 'key_menu_id' });

  RoleMenuSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  });

  RoleMenuSchema.set('toJSON', { virtuals: true, getters: true });

  return mongoose.model('RoleMenu', RoleMenuSchema, 'role_menu');
};
