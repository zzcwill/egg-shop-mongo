module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { 
					code: 20000,
					data: '',
					message: '接口不存在'
				 };
      } else {
        ctx.body = '请求资源不存在'
      }
    }
  };
};