'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
	async login() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let ruleData = {
			username: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			],
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(getData.username);

		if (!user) {
			let error = new AuthFailed('用户不存在')
			throw error;
			return
		}

		let toPassword = setPassWord(getData.password, user.salt);
		if (toPassword !== user.password) {
			let error = new AuthFailed('密码不正确')
			throw error;
			return
		}

		let apidata = lodash.pick(user, ['uid', 'username', 'level', 'is_on_duty', 'register_time']);

		let token = setToken(apidata);

		await cache.set(token, user, config.tokenSecurity.expiresIn);

		apidata.token = token

		ctx.body = resOk(apidata)
	}
	async logout() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let token = ctx.request.body.token;

		let tokenCache = await cache.get(token)

		if (tokenCache) {
			await cache.del(token)
		}


		ctx.body = resOk({}, 10000, '注销成功')
	}
	async userInfo() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let apidata = lodash.pick(ctx.request.user, ['uid', 'username', 'level', 'is_on_duty', 'register_time'])
		ctx.body = resOk(apidata);
	}
	async createUser() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let ruleData = {
			username: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			],
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(getData.username);

		if (user) {
			let error = new AuthFailed('用户已存在')
			throw error;
			return
		}

		getData.salt = getSalt()
		let toPassword = setPassWord(getData.password, getData.salt);
		getData.password = toPassword;

		// createUser
		let newUser = await userService.createUser(getData);

		let apidata = lodash.pick(newUser, ['uid', 'username', 'level', 'is_on_duty', 'register_time']);

		ctx.body = resOk(apidata, 10000, '创建用户成功')
	}
	async changePassword() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let ruleData = {
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			],
			newPassword: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]			
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(ctx.request.user.username);

		if (!user) {
			let error = new AuthFailed('用户不存在')
			throw error;
			return
		}

		
		let toPassword = setPassWord(getData.password, user.salt);
		if (toPassword !== user.password) {
			let error = new AuthFailed('密码不正确')
			throw error;
			return
		}


		let toNewPassword = setPassWord(getData.newPassword, user.salt);

		let isOK = await userService.changePassword({
			password: toNewPassword
		},{
			uid: user.uid
		});

		ctx.body = resOk({
			isOK: isOK
		})
	}
}

module.exports = UserController;
