'use strict';

const Service = require('egg').Service;

class ImgService extends Service {
  async add(img) {
    const { File } = this.ctx.model;

    let newImg = await File.create(img)
    return newImg
  }
}

module.exports = ImgService;