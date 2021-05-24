'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

class UserService extends Service {
  async getUserByUsername(username) {
    const { User } = this.ctx.model;

    const query = { username: username };
    let user = await User.findOne(query).exec();

    if(user) {
      user = user.toObject()
      let register_time = user.register_time;
      let modify_time = user.modify_time;
      user.register_time = dayjs(register_time).format('YYYY-MM-DD HH:mm:ss');
      user.modify_time = dayjs(modify_time).format('YYYY-MM-DD HH:mm:ss');
    }     

    return user
  }
  async createUser(user) {
    const { User } = this.ctx.model;
    let newUser = new User(user)
    let toUser = await newUser.save()

    if(toUser) {
      toUser = toUser.toObject()
      let register_time = toUser.register_time;
      let modify_time = toUser.modify_time;
      toUser.register_time = dayjs(register_time).format('YYYY-MM-DD HH:mm:ss');
      toUser.modify_time = dayjs(modify_time).format('YYYY-MM-DD HH:mm:ss');
    }  
    // console.info(toUser) 

    return toUser
  }
  async changePassword(password, uid) {
    const { User } = this.ctx.model;
    let isOk = await User.update(
      password,
      {
        //条件
        where: uid
      }
    )
    return isOk[0]
  }
  async getUserByOpenid(openid) {
    const { User } = this.ctx.model;
    let user = await User.findOne({
      where: {
        openid
      },
      raw:true
    })
    return user
  }
  async updateOpenid(uid, openid) {
    const { User } = this.ctx.model;

    let isOk = await User.update(
      {
				openid: openid,
			},
      {
        //条件
        where: {
					uid
				},
        raw:true
      }
    )
    return isOk[0]
  }  
}

module.exports = UserService;