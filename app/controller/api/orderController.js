'use strict';

const { Controller } = require('egg');

class OrderController extends Controller {
	async list() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { orderService, goodsService  } = service;
		const { checkParam, lodash } = ctx.helper;
		const { getOrderCode } = ctx.helper.order;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			page: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			pageSize: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;
		getData.page = lodash.toFinite(getData.page)
		getData.pageSize = lodash.toFinite(getData.pageSize)

		let listData = await orderService.list(getData);

		ctx.body = resOk(listData)	
	}
	async add() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { orderService, goodsService  } = service;
		const { checkParam, lodash } = ctx.helper;
		const { getOrderCode } = ctx.helper.order;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			customer_name: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],	
			sale_type: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			express_fee: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			order_fee: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			// ab-test-????????????
			shoesArr: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]														
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;
		getData.order_code = getOrderCode()

		// console.info(getData)

		// ab test
		// getData.shoesArr = '[{"goods_id":1,"goods_num":5,"goods_price":80},{"goods_id":2,"goods_num":5,"goods_price":80}]';

		getData.shoesArr = JSON.parse(getData.shoesArr)


		// let { shoesArr } = getData;
		// let goodsStockList = await Promise.all(
		// 	shoesArr.map(
		// 		async (item) =>{
		// 			let itemGoods = await goodsService.getGoodsById(item.goods_id)
		// 			let isCanBuy = item.goods_num <= itemGoods.goods_stock ? 1 : 0
		// 			return isCanBuy
		// 		}
		// 	)
		// )

		// if(goodsStockList.indexOf(0) !== -1) {
		// 	let error = new ParameterException('??????????????????')
		// 	throw error;			
		// 	return
		// }

		
		let result = await orderService.add(getData);

		if(result.isOK === 0) {
			let error = result.error
			throw error;
			return			
		}

		ctx.body = resOk({
			isOK: result.isOK
		});		
	}
	async update() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { orderService, goodsService  } = service;
		const { checkParam, lodash } = ctx.helper;
		const { getOrderCode } = ctx.helper.order;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			id: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let isOK = await orderService.update(getData);

		ctx.body = resOk({
			isOK: isOK
		});		
	}
	async delete() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { orderService, goodsService  } = service;
		const { checkParam, lodash } = ctx.helper;
		const { getOrderCode } = ctx.helper.order;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			id: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let order = await orderService.getOrderById(getData.id);

		if (!order) {
			let error = new ParameterException('??????????????????')
			throw error;
			return
		}
		
		let result = await orderService.delete(getData);

		if(result.isOK === 0) {
			let error = result.error
			throw error;
			return			
		}

		ctx.body = resOk({
			isOK: result.isOK
		});
	}
	async info() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { orderService, goodsService  } = service;
		const { checkParam, lodash } = ctx.helper;
		const { getOrderCode } = ctx.helper.order;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			id: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let order = await orderService.getOrderById(getData.id);

		if (!order) {
			let error = new ParameterException('??????????????????')
			throw error;
			return
		}


		ctx.body = resOk(order);
	}	
}

module.exports = OrderController;
