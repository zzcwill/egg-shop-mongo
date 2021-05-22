'use strict';

const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mq = require('../../producer');

const { Controller } = require('egg');

class EmailController extends Controller {
	async send() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			title: [
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
		let username = ctx.request.user.username;

		var option = {
				service: config.eamil.service,
				secure: true,
				auth: {
					user: config.eamil.auth.user,
					pass: config.eamil.auth.pass
				}	
		}
		var transporter = mailer.createTransport(smtpTransport(option));

    var from = '<841811316@qq.com>';
    var to = '377950622@qq.com';
    var subject = getData.title;
		var html = '<p>您好： 我是' + username + '</p>';
		
		var data = await transporter.sendMail({
			from,
			to,
			subject,
			html,
		});

		if(data) {
			ctx.body = resOk({
				isOK: 1
			},'邮件发送成功')			
		}
	}
	async sendMq() {
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { customerService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { ParameterException } = ctx.helper.httpCode;

		let ruleData = {
			title: [
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
		let username = ctx.request.user.username;

		await mq.eamilDLX(username)

		ctx.body = resOk({
			isOK: 1
		},'邮件发送成功')
	}	
}

module.exports = EmailController;
