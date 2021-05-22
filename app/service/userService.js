'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUserByUsername(username) {
    const { User } = this.ctx.model;

    let user = await User.findOne({
      where: {
        username
      },
      raw:true
    })
    return user
  }
  async createUser(user) {
    const { User } = this.ctx.model;
    let newUser = await User.create(user)
    return newUser
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