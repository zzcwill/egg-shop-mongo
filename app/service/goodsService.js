'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  async allList() {
    const { Goods } = this.ctx.model;

		const rows = await Goods.findAll({
			where: {},
      raw:true
		});

    return {
      list: rows
    }
  }  
  async getGoodsById(id) {
    const { Goods } = this.ctx.model;
    let goods = await Goods.findOne({
      where: {
        id
      },
      raw:true
    })
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