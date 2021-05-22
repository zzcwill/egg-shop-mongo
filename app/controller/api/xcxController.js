'use strict';

const { Controller } = require('egg');
const axios = require('axios');

const appid = 'wxe9bd6704da7435ff';
const appSecret = 'b21f5a2b7497bacd729537fbc135ab84';

class UserController extends Controller {
	async xcxLogin() {
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
			],
			openid: [
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

		// openid
		let updateOk = await userService.updateOpenid(user.id, getData.openid);

		if(updateOk !== 1) {
			let error = new ParameterException('绑定openid失败')
			throw error;
			return		
		}

		let apidata = lodash.pick(user, ['uid', 'username', 'level', 'is_on_duty', 'register_time']);

		let token = setToken(apidata);

		await cache.set(token, user, config.tokenSecurity.expiresIn);

		apidata.token = token

		ctx.body = resOk(apidata)
	}

	// 获取微信小程序-用户openid
	// 有绑定,返回登录token
	// 没有绑定,返回openid 去调登录绑定openid
	async jscode2session() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { userService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		let ruleData = {
			code: [
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
			]
		}
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let toUrl = 'https://api.weixin.qq.com/sns/jscode2session';
		let paramData = '?appid=' + appid + '&secret=' + appSecret +'&js_code=' + getData.code + '&grant_type=' + 'authorization_code'
		let wechatdata = await axios({
			method: 'get',
			url: toUrl + paramData,
			headers: {
				'Content-Type': 'application/json',
			},			
		});		

		let openid = wechatdata.data.openid;
		// 这个去获取用户信息
		let session_key = wechatdata.data.session_key;

		let user = await userService.getUserByOpenid(openid) 

		// 用session_key-去获取微信用户信息

		let apidata = {}
		if(!user) {
			apidata.isOk = 0;
			apidata.openid = openid;
			ctx.body = resOk(apidata);
			return
		}

		if(user) {
			let tokenCahe = lodash.pick(user, ['uid', 'username', 'level', 'is_on_duty', 'register_time']);
			let token = setToken(tokenCahe);
			await cache.set(token, user, config.tokenSecurity.expiresIn);

			apidata.token = token;
			apidata.openid = openid;
			// apidata.session_key = session_key;
			apidata.isOk = 1;
			apidata.user = tokenCahe;

			ctx.body = resOk(apidata);
		}
	}	
}

module.exports = UserController;
