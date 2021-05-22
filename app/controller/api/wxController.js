'use strict';

const { Controller } = require('egg');
const axios = require('axios');

// 订阅号
// const appid = 'wxe2a7c21fe894a92d';
// const appSecret = '0b3a16c1661914fa41397a64875ec534';

// test服务号
const appid = 'wxe232456cb62be35a';
const appSecret = 'c38c2a1187ca07e4b6077a3c9aa2abde';

function getTimeMs() {
	var t = new Date()
	return t.getTime()
}

class UserController extends Controller {
	// openid 容易被前端修改
	// 1 实际业务不能直接openid绑定,通过access_token传给后端拿到openid,access_token失效就让前端跳转页面
	// 2 加密openid放redis缓存-用了第二种
	async wxLogin() {
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
			openidCacheKey: [
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

    let openid = await cache.get(getData.openidCacheKey);
  
    if(!openid) {
      throw new Forbidden('无效的openid');
			throw error;
      return
    } 

		// openid
		let updateOk = await userService.updateOpenid(user.uid, openid);

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

	// 获取微信公众号h5-用户openid
	// 有绑定,返回登录token
	// 没有绑定,返回openid 去调登录绑定openid
	async oauth2AccessToken() {
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

		console.info(getData)

		let toUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
		let paramData = '?appid=' + appid + '&secret=' + appSecret +'&code=' + getData.code + '&grant_type=' + 'authorization_code'
		let wechatdata = await axios({
			method: 'get',
			url: toUrl + paramData,
			headers: {
				'Content-Type': 'application/json',
			},			
		});	

		console.info(wechatdata)
		console.info(wechatdata.data)

		if (wechatdata.errcode) {
			let error = new ParameterException(wechatdata.errmsg)
			throw error;
			return
		}

		let openid = wechatdata.data.openid;

		// 这个去获取用户信息-会失效存redis
		// https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
		let access_token = wechatdata.data.access_token;

		// test
		// let openid = '1'

		let user = await userService.getUserByOpenid(openid) 

		// 用session_key-去获取微信用户信息

		let apidata = {}
		if(!user) {
			apidata.isOk = 0;

			let openidCacheKey =  getTimeMs()
			await cache.set(openidCacheKey, openid, config.tokenSecurity.expiresIn);
			apidata.openidCacheKey = openidCacheKey;
			ctx.body = resOk(apidata);
			return
		}

		if(user) {
			let tokenCahe = lodash.pick(user, ['uid', 'username', 'level', 'is_on_duty', 'register_time']);
			let token = setToken(tokenCahe);
			await cache.set(token, user, config.tokenSecurity.expiresIn);

			apidata.token = token;
			// apidata.openid = openid;
			// apidata.session_key = session_key;
			apidata.isOk = 1;
			apidata.user = tokenCahe;

			ctx.body = resOk(apidata);
		}
	}	

	// 消息推送
  async authWechatMsg() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { wxService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		console.info(ctx.request.query)
		let toData = await wxService.authWechatMsg(ctx.request.query)
		console.info(toData)

		ctx.body = toData   
  }

  async wechatMsg() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { wxService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;

		// console.info(ctx.request.body)

		let toData = await wxService.wechatMsg(ctx.request.body)

		// console.info(toData)

		if(toData.error) {
			let error = new ParameterException('微信消息推送xml解析错误')
			throw error;			
			return
		}

		ctx.body = toData.data 
  }	
	
	async wechatSend() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { wxService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;
		
		let access_token = await cache.get('access_token')

		if(!access_token) {
			await wxService.getAccessToken()
			access_token = await cache.get('access_token')
			if(!access_token) {
				let error = new ParameterException('access_token获取失败')
				throw error;			
				return
			}
		}

		let openid = ctx.request.user.openid

		// console.info(ctx.request.user)
		if(!openid) {
			let error = new ParameterException('登录用户未绑定微信公众号')
			throw error;		
			return
		}

		// ctx.request.user.openid
		let isOK = await wxService.sendMsgToWx(openid, access_token, ctx.request.user)

		ctx.body = resOk({
			isOK: isOK
			// access_token: access_token
		})
	}

	async wechatQrCode() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { setToken } = ctx.helper.token;
		const { wxService, cache } = service;
		const { checkParam, lodash } = ctx.helper;
		const { AuthFailed, ParameterException } = ctx.helper.httpCode;		
		const { setPassWord, getSalt } = ctx.helper.password;
		
		let access_token = await cache.get('access_token')

		if(!access_token) {
			await wxService.getAccessToken()
			access_token = await cache.get('access_token')
			if(!access_token) {
				let error = new ParameterException('access_token获取失败')
				throw error;			
				return
			}
		}

		let toData = await wxService.getWechatQrCode(access_token, ctx.request.user)

		ctx.body = resOk(toData)
	}
	
}

module.exports = UserController;
