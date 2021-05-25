'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async role(search) {
    const { Role } = this.ctx.model;

    const { page, pageSize } = search
    let offset = (page - 1) * pageSize;
    let query = {};
    const opts = {
      skip: offset,
      limit: pageSize,
      sort: {
        create_time: -1
      }
    };
    let roleList = await Role.find(query, '', opts).exec();

    let toRoleList = []
    roleList.forEach((item) => {
      // toRoleList.push(item.toObject({virtuals: true}))
      toRoleList.push(item)
    })

    return {
      list: toRoleList,
      count: toRoleList.length
    }
  }
  async roleById(id) {
    const { Role } = this.ctx.model;
    const { count, rows } = await Role.findAndCountAll({
      where: {
        id: id
      },
      offset: offset,
      limit: pageSize,
      raw: true
    });

    return {
      list: rows,
      count: count
    }
  }
  async userRole(search) {
    const { User, UserRole, Role } = this.ctx.model;

    const { uid, page, pageSize } = search;
    let offset = (page - 1) * pageSize;

    let userRoleList = await User.aggregate([
      {
        $match: { uid: uid }
      },
      {
        $lookup: {
          from: 'user_role',
          localField: 'uid',
          foreignField: 'user_id',
          as: 'roleList'
        }
      },
      {
        $project: {
          'uid': 1,
          'roleList.user_id': 1,
          'roleList.role_id': 1
        }
      }
    ])

    userRoleList = userRoleList[0].roleList;

    let listRole = []
    for (let key = 0; key < userRoleList.length; key++) {
      listRole.push(userRoleList[key].role_id)
    }

    let query = { id: { $in: listRole } };
    const opts = {};
    let dataList = await Role.find(query, '', opts).exec();

    let todataList = []
    dataList.forEach((item) => {
      todataList.push(item.toObject({ virtuals: true }))
    })

    return {
      list: todataList,
      count: todataList.length
    }


  }
}

module.exports = RoleService;