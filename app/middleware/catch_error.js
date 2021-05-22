module.exports = () => {
  return async function catchError(ctx, next) {
    try {
      await next()
    } catch (err) {

      const { resFail, resCodeArr } = ctx.helper.resData;
      const { HttpException } = ctx.helper.httpCode

      // 开发环境
      const isHttpException = err instanceof HttpException;
      const isDev = process.env.NODE_ENV === 'development';
  
      if (isDev) {
        if(!isHttpException) {
          if(err.name === 'SequelizeDatabaseError') {
            console.info(err.parent.sqlMessage)
            ctx.body = resFail(err.parent.sqlMessage, resCodeArr[1][0]);
            ctx.status = 500;     
          }
          if(err.name !== 'SequelizeDatabaseError') {
            console.info(err)
            throw err;          
          }     
        } 
        if (isHttpException) {
          console.info(resFail(err.msg, err.code))
          ctx.body = resFail(err.msg, err.code);
          ctx.status = err.status;
          return
        }        
      }  
      
      if (!isDev) {
        if (isHttpException) {
          ctx.body = resFail(err.msg, err.code);
          ctx.status = err.status;
        }  
        if (!isHttpException) {
          ctx.body = resFail('服务器内部异常', resCodeArr[1][0]);
          ctx.status = 500;
        }         
      }
    }
  };
};
