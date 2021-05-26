'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  async allList() {
    const { Goods } = this.ctx.model;

    let whereData = {}
    const opts = { 
      sort: {
        create_time: -1
      } 
    };
    let rows = await Goods.find(whereData, '', opts).exec();

    return {
      list: rows
    }
  }  
  async getGoodsById(id) {
    const { Goods } = this.ctx.model;

    let goods = await Goods.findOne({ id: id }).exec();

    return goods
  }
  async add(goods) {
    const { Goods } = this.ctx.model;
    let newGoods = await Goods.create(goods)
    return newGoods
  }
  async update(search) {
    const { Goods } = this.ctx.model;
		let { id } = search;

    let isOk = await Goods.update(
      {
				// goods_stock: goods_stock,
			},
      {
        //条件
        where: {
					id: id
				}
      }
    )
    return isOk[0]
  }
	async delete(search) {
    const { Goods } = this.ctx.model;
		let { id } = search;
		let isOk = await Goods.destroy({
			where: {
				id: id
			}
		})
    return isOk[0]		
	}
}

module.exports = GoodsService;