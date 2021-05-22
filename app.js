'use strict';

module.exports = app => {
  app.once('server', server => {
  });
  app.on('error', (err, ctx) => {
  });
  app.on('request', ctx => {
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    // const used = Date.now() - ctx.starttime;
    // log total cost
  });
};
