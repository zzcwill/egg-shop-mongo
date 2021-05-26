'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async getOrderById(id) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let user = await Order.findOne({ id: id }).exec();

    let shoesArr = await OrderInfo.find({ order_id: id }).exec();

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
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    const { page, pageSize, customer_name, phone, createDateTimeStart, createDateTimeOver } = search

    let whereData = {}

    if(customer_name) {
      let reg = new RegExp(customer_name, 'i') 
      whereData.customer_name = {
        $regex : reg
      }
    }

    if(phone) {
      let reg = new RegExp(phone, 'i') 
      whereData.phone = {
        $regex : reg
      }
    }
    if(createDateTimeStart) {
      let startTime = createDateTimeStart + ' 00:00:00';
      whereData.create_time = {
        $gte: startTime
      }    
    }
    if(createDateTimeOver) {
      let endTime = createDateTimeOver + ' 23:59:59';
      whereData.create_time = {
        $lt: endTime
      }    
    }
    if(createDateTimeStart && createDateTimeOver) {
      let startTime = createDateTimeStart + ' 00:00:00';
      let endTime = createDateTimeOver + ' 23:59:59';
      whereData.create_time = {
        $gte: startTime,
        $lt: endTime
      }    
    }

    let offset = (page - 1) * pageSize;
    const opts = { 
      skip: offset, 
      limit: pageSize, 
      sort: {
        create_time: -1
      } 
    };
    let orderList = await Order.find(whereData, '', opts).exec();

    return {
      list: orderList,
      count: orderList.length
    }
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

    //事务
    let result = {
      error: {},
      isOK: 0
    }    

    try{
      let query = { id: id }
      await Order.deleteOne(query).exec();   
      let query2 = { order_id: id } 
      await OrderInfo.delete(query2).exec();      
      result.isOK = 1
    
    } catch (error) {
      console.info(error)
      result = {
        error: error,
        isOK: 0       
      }    
    }


    return result	
	} 
}

module.exports = MenuService;

