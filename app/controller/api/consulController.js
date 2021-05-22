'use strict';

const { Controller } = require('egg');

class ConsulController extends Controller {
	async health() {
		const { ctx, service } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

		ctx.body = resOk({
			isOk: 1
		})
	}
}

module.exports = ConsulController;
