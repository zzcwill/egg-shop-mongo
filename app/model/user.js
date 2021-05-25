'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const UserSchema = new Schema({
    uid: { type: Number, required: true  },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    realname: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    sex:{ type: Number, default: null },
    age: { type: Number, default: null },
    level: { type: Number, default: null },
    shop_id: { type: ObjectId, default: null },
    shop_name: { type: String, default: null },
    last_login_time: { type: Date, default: null },
    openid: { type: String, default: null },
    is_on_duty: { type: Number, default: 1, required: true },
    register_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  UserSchema.index({ uid: 1 }, { unique: true, name: 'ukey_uid' });
  UserSchema.index({ username: 1 }, { unique: true, name: 'ukey_username' });

  // UserSchema.virtual('uid').get(function() {
  //   return this._id;
  // });

  UserSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;

    next();
  }); 

  UserSchema.set('toObject', { virtuals: true });
  // UserSchema.set('toJSON', { virtuals: true });

  return mongoose.model('User', UserSchema, 'user');
};