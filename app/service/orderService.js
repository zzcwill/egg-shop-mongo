'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async getOrderById(id) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let user = await Order.findOne({
      where: {
        id
      },
      raw:true
    })

    let shoesArr = await OrderInfo.findAll({
      where: {
        order_id: id
      },
      raw:true
    })

		let shoesArrInfo = await Promise.all(
			shoesArr.map(
				async (item) =>{
					let itemGoods = await this.service.goodsService.getGoodsById(item.goods_id)
          // console.info(itemGoods)
					item.goods_brand = itemGoods.goods_brand
          item.goods_code = itemGoods.goods_code
          item.goods_sex = itemGoods.goods_sex
          item.goods_color = itemGoods.goods_color
					return item
				}
			)
		)

    user.shoesArr = shoesArrInfo;

    return user
  } 
  async list(search) {
    // const { Order, OrderInfo, Goods } = this.ctx.model;
    // const { lodash } = this.ctx.helper;

    // const { page, pageSize, customer_name, phone, createDateTimeStart, createDateTimeOver } = search

    // const Op = this.ctx.app.Sequelize.Op;
    // // console.info(Op)

    // let whereData = {}

    // if(customer_name) {
    //   whereData.customer_name = {
    //     [Op.like]: `%${customer_name}%`
    //   }
    // }

    // if(phone) {
    //   whereData.phone = {
    //     [Op.like]: `%${phone}%`
    //   }
    // }
    // if(createDateTimeStart) {
    //   let startTime = createDateTimeStart + ' 00:00:00';
    //   whereData.create_time = {
    //     [Op.gte]: startTime
    //   }    
    // }
    // if(createDateTimeOver) {
    //   let endTime = createDateTimeOver + ' 23:59:59';
    //   whereData.create_time = {
    //     [Op.lt]: endTime
    //   }    
    // }
    // if(createDateTimeStart && createDateTimeOver) {
    //   let startTime = createDateTimeStart + ' 00:00:00';
    //   let endTime = createDateTimeOver + ' 23:59:59';
    //   whereData.create_time = {
    //     [Op.gte]: startTime,
    //     [Op.lt]: endTime
    //   }    
    // }

    // let offset = (page - 1) * pageSize;
		// const { count, rows } = await Order.findAndCountAll({
		// 	where: whereData,
    //   order: [
    //     ['create_time', 'DESC']
    //     // ['create_time', 'ASC']
    //   ],      
		// 	offset: offset,
		// 	limit: pageSize,
    //   raw:true
		// });

    // return {
    //   list: rows,
    //   count: count
    // }
  }
  async add(orderInfo) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let { order_code, shoesArr } = orderInfo;

    let t = null;
    //事务
    let result = {
      error: {},
      isOK: 0
    }
    try {
        t = await this.ctx.model.transaction();
      
        let newOrder = lodash.pick(orderInfo, ['order_code', 'customer_name', 'customer_id', 'phone', 'address', 'shop_id', 'sale_type', 'express_fee', 'order_fee', 'order_discount_fee']);
        await Order.create(newOrder, { transaction: t })
    
        let order = await Order.findOne({
          where: {
            order_code: order_code
          },
          raw:true,
          transaction: t
        })

        console.info(order_code)
        console.info(order.id)

        for(let key = 0 ; key < shoesArr.length ; key++ ) {
          let item = shoesArr[key]

          let sunMoney = item.num * item.actual_price;
          await OrderInfo.create(
            {
              order_id: order.id,
              goods_id: item.goods_id,
              num: item.num,
              actual_price: item.actual_price,
              actual_fee: sunMoney
            },
            { transaction: t }
          );       
        }
        
        await t.commit();

        result.isOK = 1;

      
    } catch (error) {
      // console.info(error)
      result = {
        error: error,
        isOK: 0       
      }
      await t.rollback();
    }
    return result
  }
  async update(search) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

		let { id, customer_name } = search;

    let isOk = await Order.update(
      {
				customer_name: customer_name,
			},
      {
        //条件
        where: {
					id: id
				},
        raw:true
      }
    )
    return isOk[0]
  }
	async delete(search) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

		let { id } = search;
    let t = null;
    //事务
    let result = {
      error: {},
      isOK: 0
    }    

    try{
      t = await this.ctx.model.transaction();

      await Order.destroy({
        where: {
          id: id
        },
        raw:true,
        transaction: t
      });       

      await OrderInfo.destroy({
        where: {
          order_id: id
        },
        raw:true,
        transaction: t
      });
    
      await t.commit();
      result.isOK = 1
    
    } catch (error) {
      console.info(error)
      await t.rollback();
      result = {
        error: error,
        isOK: 0       
      }    
    }


    return result	
	} 
}

module.exports = MenuService;

