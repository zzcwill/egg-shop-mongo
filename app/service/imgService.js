'use strict';

const Service = require('egg').Service;

class ImgService extends Service {
  async add(img) {
    const { File } = this.ctx.model;

    let newImg = new File(img)
    let toNewImg = await newImg.save()
    return toNewImg
  }
}

module.exports = ImgService;