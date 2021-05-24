'use strict';

const Service = require('egg').Service;

let getTreeMenu = (dataList) => {
  let dataArr = [];
  let childrenArr = [];

  for(let key = 0 ; key < dataList.length ; key++) {
    if(!dataList[key].parent_id) {
      let itemData = dataList[key]
      itemData.children = []
      dataArr.push(itemData)
    }
  }

  for(let key = 0 ; key < dataList.length ; key++) {
    if(dataList[key].parent_id) {
      let itemData = dataList[key]
      if(!childrenArr[itemData.parent_id]) {
        childrenArr[itemData.parent_id] = []
      }
      childrenArr[itemData.parent_id].push(itemData)
    }
  }

  for(let key = 0 ; key < dataArr.length ; key++) {
    let itemData = dataArr[key]
    let childrenData = childrenArr[itemData.id]

    if(childrenData) {
      itemData.children = childrenData
    }

    dataArr[key] = itemData
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
    menuList.forEach((item)=>{
      toMenuList.push(item.toObject({virtuals: true}))
    })

    // console.info(toMenuList)

    let treeMenu = []
    if(toMenuList.length !== 0) {
      treeMenu = getTreeMenu(toMenuList)      
    }

    return {
      list: treeMenu,
      count: treeMenu.length
    }    
  }
  async userMenu(search) {
    const { Menu } = this.ctx.model;

    const { uid, page, pageSize } = search;
    let offset = (page - 1) * pageSize;

		// let userRoleList = await this.app.model.query(
    //   `
    //     SELECT e.* 
    //     FROM 
    //     user a 
    //     INNER JOIN user_role  b  on  a.uid = b.user_id 
    //     INNER JOIN role  c  on  b.role_id = c.id
    //     INNER JOIN role_menu d  on  c.id = d.role_id
    //     INNER JOIN menu e  on  d.menu_id = e.id        
    //     WHERE a.uid = ?
    //     LIMIT ?
    //     OFFSET ?;`,
    //   {
    //     replacements: [uid, pageSize, offset],
    //     type: QueryTypes.SELECT,
    //     raw: true
    //   }
    // );

    // let treeMenu = getTreeMenu(userRoleList)
    let treeMenu = []

    return {
      list: treeMenu,
      count: treeMenu.length
    }
  }
}

module.exports = MenuService;
