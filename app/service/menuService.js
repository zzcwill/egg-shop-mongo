'use strict';

const Service = require('egg').Service;

let getTreeMenu = (dataList) => {
  let dataArr = [];

  for (let key = 0; key < dataList.length; key++) {
    if (dataList[key].parent_id === null) {
      let itemData = dataList[key]
      itemData.children = []
      dataArr.push(itemData)
    }
  }

  for (let key = 0; key < dataList.length; key++) {
    if (dataList[key].parent_id !== null) {
      let itemData = dataList[key]

      for (let key2 = 0; key2 < dataArr.length; key2++) {
        if (itemData.parent_id === dataArr[key2].id) {
          dataArr[key2].children.push(itemData)
        }
      }
    }
  }

  return dataArr;
}

class MenuService extends Service {
  async menu(search) {
    const { Menu } = this.ctx.model;

    let { page, pageSize } = search;
    let offset = (page - 1) * pageSize;
    let query = {};
    const opts = {
      skip: offset,
      limit: pageSize,
      sort: {
        create_time: -1
      }
    };
    let menuList = await Menu.find(query, '', opts).exec();

    let toMenuList = []
    menuList.forEach((item) => {
      toMenuList.push(item.toObject({ virtuals: true }))
    })

    let treeMenu = []
    if (toMenuList.length !== 0) {
      treeMenu = getTreeMenu(toMenuList)
    }

    return {
      list: treeMenu,
      count: treeMenu.length
    }
  }
  async userMenu(search) {
    const { User, UserRole, RoleMenu, Menu } = this.ctx.model;

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

    let query = { role_id: { $in: listRole } };
    const opts = {};
    let menuList = await RoleMenu.find(query, '', opts).exec();

    let newMenuList = []
    for (let key = 0; key < menuList.length; key++) {
      newMenuList.push(menuList[key].menu_id)
    }

    let query2 = { id: { $in: newMenuList } };
    const opts2 = {
      skip: offset,
      limit: pageSize,
      sort: {
        id: -1
      }
    };
    let menDataList = await Menu.find(query2, '', opts2).exec();

    let toMenuList = []
    menDataList.forEach((item) => {
      toMenuList.push(item.toObject({ virtuals: true }))
    })

    let treeMenu = getTreeMenu(toMenuList)

    return {
      list: treeMenu,
      count: treeMenu.length
    }
  }
}

module.exports = MenuService;
