'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.tokenSecurity = {
    secretKey: "zzc",
    // 过期时间 3小时
    expiresIn: 60 * 60 * 24
  };

  config.keys = appInfo.name + '_zzc';
  config.maxAge = 4 * 3600 * 1000;

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.ejs': 'ejs',
    }
  };

  // 配置支持xml获取数据
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    }
  };  

  config.multipart = {
    mode: 'stream'
  };
  config.uploadOption = {
		uploadsUrl: '/imgData/uploads/',
    outUploadsUrl: '/uploads/',
		maxSize: 1024 * 1024 * 2
	};

  // add your middleware config here
  config.middleware = [
    'catchError',
    'auth',
    'notfoundHandler',
  ];
  config.auth = {
    noauthArr: [
      '/api/login', 
      '/api/createUser', 

      '/api/wechat/jscode2session',
      '/api/wechat/xcxLogin',

      '/api/wechat/oauth2AccessToken',
      '/api/wechat/wxLogin',

      '/api/wechat/msg',

      '/api/health'
    ],
    ignore: ctx => {
      if (ctx.request.url.indexOf('/api') === -1) {
        return true;
      }
      return false;
    }
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if (ctx.request.url.indexOf('/api') !== -1) {
          return true;
        }
        return false;
      },
    },
  };

  config.multipart = {
    mode: 'stream',
  };

  config.cluster = {
    hostname: 'http://127.0.0.1',
    listen: {
      port: 3000,
    }
  };

  config.logger = {
    outputJSON: true,
  };

  config.session = {
    key: 'session',
    // maxAge: 24 * 3600 * 1000, // 1 天
    maxAge: 4 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };


  return config;
};
