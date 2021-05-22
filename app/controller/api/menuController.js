'use strict';

const { Controller } = require('egg');

class MenuController extends Controller {
	async menu() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { menuService } = service;
		const { checkParam, lodash } = ctx.helper;
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

		let listData = await menuService.menu(getData);

		ctx.body = resOk(listData)		
	}
	async userMenu() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { menuService } = service;
		const { checkParam, lodash } = ctx.helper;
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
		getData.uid = ctx.request.user.uid;


		let listData = await menuService.userMenu(getData);

		ctx.body = resOk(listData)		
	}
}

module.exports = MenuController;
