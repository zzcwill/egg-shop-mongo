'use strict';

const { Controller } = require('egg');

class CustomerController extends Controller {
	async allList() {
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

		// let ruleData = {
		// 	page: [
		// 		{
		// 			ruleName: 'required',
		// 			rule: (val) => {
		// 				var isOk = true
		// 				if (!val) {
		// 					isOk = false
		// 				}
		// 				return isOk
		// 			}
		// 		},
		// 	],
		// 	pageSize: [
		// 		{
		// 			ruleName: 'required',
		// 			rule: (val) => {
		// 				var isOk = true
		// 				if (!val) {
		// 					isOk = false
		// 				}
		// 				return isOk
		// 			}
		// 		},
		// 	]
		// }
		// let msgParam = checkParam.check(ctx, ruleData)
		// if (msgParam) {
		// 	let error = new ParameterException(msgParam)
		// 	throw error;
		// 	return
		// }

		// let getData = ctx.request.body;
		// getData.page = lodash.toFinite(getData.page)
		// getData.pageSize = lodash.toFinite(getData.pageSize)

		let listData = await customerService.allList();

		ctx.body = resOk(listData)
	}	
	async list() {
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

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

		let listData = await customerService.list(getData);

		ctx.body = resOk(listData)
	}
	async add(){
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			name: [
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

		let listData = await customerService.add(getData);

		ctx.body = resOk(listData)	
	}
	async update() {
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

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

		let isOK = await customerService.update(getData);

		ctx.body = resOk({
			isOK: isOK
		})		
	}
	async delete() {
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

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

		let isOK = await customerService.delete(getData);

		console.info(isOK)

		ctx.body = resOk({
			isOK: isOK
		})	
	} 
}

module.exports = CustomerController;
