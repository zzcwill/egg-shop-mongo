'use strict';

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const bytes = require('bytes');


const { Controller } = require('egg');
const { request } = require('https');
const { nextTick } = require('process');

class ImgController extends Controller {
	async upload() {	
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { cache, imgService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;
		
		const imgStream = await ctx.getFileStream();

		let size = ctx.request.header['content-length']*1;

    try {
			if(size > config.uploadOption.maxSize) {
				throw new ParameterException('上传图片太大');
				return
			}

			const filename = (new Date()).getTime() + path.basename(imgStream.filename);
			const target = path.join(config.baseDir, `${config.uploadOption.uploadsUrl}${filename}`);
			const readFileStream = fs.createWriteStream(target);
			imgStream.pipe(readFileStream);

			let newImg = {
				file_type: imgStream.mime,
				file_size: size,
				file_url: `${config.cluster.hostname}:${config.cluster.listen.port}/public${config.uploadOption.outUploadsUrl}${filename}`,
				file_name: filename
			};
	
			let imgData = await imgService.add(newImg)
	
			if(imgData) {
				ctx.body = resOk(
					imgData,
					10000,
					'图片上传成功'
				)
			}


    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(imgStream);
      ctx.logger.warn(err);
			
			throw err;
    }
	}
}

module.exports = ImgController;
