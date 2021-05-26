'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getOrderById(id) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let order = await Order.findOne({ id: id }).exec();
    // console.info(oder)
    let shoesArr = await OrderInfo.find({ order_id: id }).exec();
    // console.info(shoesArr)
    let newShoesArr = []
    shoesArr.map((item) => {
      newShoesArr.push(item.goods_id)
    })

    let query = { id: { $in: newShoesArr } };
    const opts = {};
    let goodsList = await Goods.find(query, '', opts).exec();

    order = order.toObject()
    order.shoesArr = goodsList;

    return order
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

    let { shoesArr } = orderInfo;

    //事务
    let result = {
      error: {},
      isOK: 0
    }
    try {
      
        let newOrder = lodash.pick(orderInfo, ['order_code', 'customer_name', 'customer_id', 'phone', 'address', 'shop_id', 'sale_type', 'express_fee', 'order_fee', 'order_discount_fee']);

        let query = {};
        const opts = { 
          skip: 0, 
          limit: 1, 
          sort: {
            id: -1
          } 
        };        
        let maxOrder = await Order.find(query, '', opts).exec();
        if(maxOrder.length === 0) {
          newOrder.id = 1;
        }
        if(maxOrder.length !== 0) {
          newOrder.id = maxOrder[0].toObject().id + 1;
        }
        let toorder = new Order(newOrder);
        let order = await toorder.save()

        for(let key = 0 ; key < shoesArr.length ; key++ ) {
          let item = shoesArr[key]

          let sunMoney = item.num * item.actual_price;

          let newOrderInfo = new OrderInfo({
            order_id: order.id,
            goods_id: item.goods_id,
            num: item.num,
            actual_price: item.actual_price,
            actual_fee: sunMoney            
          })  
          await newOrderInfo.save()   
        }

        result.isOK = 1;

      
    } catch (error) {
      // console.info(error)
      result = {
        error: error,
        isOK: 0       
      }
    }
    return result
  }
  async update(search) {
    const { Order, OrderInfo, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

		let { id, customer_name } = search;

    const query = { id };
    const update = { customer_name };
    let isOk = await Order.updateOne(query, update).exec();    
    return isOk.n
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
      await OrderInfo.remove(query2).exec();      
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

module.exports = OrderService;

