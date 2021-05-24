'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    realname: { type: String},
    phone: { type: String},
    email: { type: String},
    sex:{ type: Number},
    age: { type: Number},
    level: { type: Number},
    shop_id: { type: ObjectId},
    shop_name: { type: String},
    last_login_time: { type: Date },
    openid: { type: String },
    is_on_duty: { type: Number, default: 1, required: true },
    register_time: { type: Date, default: Date.now, required: true },
    modify_time: { type: Date, default: Date.now, required: true }
  });

  UserSchema.index({ username: 1 }, { unique: true, name: 'ukey_username' });

  UserSchema.virtual('uid').get(function() {
    return this._id;
  });

  UserSchema.pre('save', function(next) {
    const now = new Date();
    this.modify_time = now;
    next();
  }); 

  return mongoose.model('User', UserSchema, 'user');
};
