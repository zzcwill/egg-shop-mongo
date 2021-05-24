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
    roleList.forEach((item)=>{
      toRoleList.push(item.toObject({virtuals: true}))
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
      raw:true
		});

    return {
      list: rows,
      count: count
    }
  }  
  async userRole(search) {
    // const { Role } = this.ctx.model;
    // const { uid, page, pageSize } = search;
    // let offset = (page - 1) * pageSize;

		// let userRoleList = await this.ctx.model.query(
    //   `
    //     SELECT c.* 
    //     FROM 
    //     user a 
    //     INNER JOIN user_role  b  on  a.uid = b.user_id 
    //     INNER JOIN role  c  on  b.role_id = c.id
    //     WHERE a.uid = ?
    //     LIMIT ?
    //     OFFSET ?;`,
    //   {
    //     replacements: [uid, pageSize, offset],
    //     type: QueryTypes.SELECT,
    //     raw: true
    //   }
    // );

    // return {
    //   list: userRoleList,
    //   count: userRoleList.length
    // }
  }  
}

module.exports = RoleService;