'use strict';

const { Controller } = require('egg');

class WebController extends Controller {
  async test() {
    const { ctx } = this;
    await ctx.render('test.ejs', { title: 'test' });
  }
  async test2() {
    const { ctx } = this;
    await ctx.render('test2.ejs', { title: 'test2' });
  }
  async test3() {
    const { ctx } = this;
    await ctx.render('test3.ejs', { title: 'test3' });
  }
  async test4() {
    const { ctx } = this;
    await ctx.render('test4.ejs', { title: 'test4' });
  }
  async test5() {
    const { ctx } = this;
    await ctx.render('test5.ejs', { title: 'test5' });
  }
  async socket() {
    const { ctx } = this;
    await ctx.render('socket.ejs', { title: 'socket' });
  }
  async socket2() {
    const { ctx } = this;
    await ctx.render('socket2.ejs', { title: 'socket2' });
  }
  async error() {
    const { ctx } = this;
    const { HttpException } = ctx.helper.httpCode;
    throw new HttpException('test错误')
  }
  
}

module.exports = WebController;
