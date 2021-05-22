module.exports = () => {
  return async function auth(ctx, next) {
    const { Forbidden } = ctx.helper.httpCode;
    const { cache } = ctx.service;

    const config = ctx.app.config;

    let urlArr = ctx.url.split('?')
    if(config.auth.noauthArr.indexOf(urlArr[0]) !== -1) {
      await next();
      return
    }
  
    let token = ''
    if(ctx.request.body.token) {
      token = ctx.request.body.token;
    }
  
    if(ctx.request.query.token) {
      token = ctx.request.query.token;
    }
  
    if(ctx.request.headers.token) {
      token = ctx.request.headers.token;
    }
  
    // 无带token
    if (!token) {
      throw new Forbidden('需要传token');
      await next();
      return
    }
  
    let tokenCache = await cache.get(token);
  
    if(!tokenCache) {
      throw new Forbidden('无效的token');
      await next();
      return
    } 
  
    ctx.request.user = tokenCache;
  
    await next();
  };
};
