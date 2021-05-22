module.exports = {
  apps : [{
      name      : 'egg-shop-mongo',      //应用名
      script    : './egg.pm2.js',   //应用文件位置    
      env: { //启动时候需要传入的变量
        COMMON_VARIABLE: "true"
      },
			env_production: {
				NODE_ENV: 'production'
			},
			max_memory_restart: '1G', // 最大内存限制数，超出自动重启
			error_file: './logs/pm2/error.log', //错误输出日志
			out_file: './logs/pm2/out.log', //日志
			merge_logs: true, // 设置追加日志而不是新建日志
			log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
			min_uptime: 1000, // 应用运行少于时间被认为是异常启动
			max_restarts: 30, // 最大异常重启次数，即小于min_uptime运行时间重启次数；
			autorestart: true, // 默认为true, 发生异常的情况下自动重启
			cron_restart: '', // crontab时间格式重启应用，目前只支持cluster模式;
			restart_delay: 60, // 异常重启情况下，延时重启时间      //
			watch: false, // 是否监听文件变动然后重启      //
  }],
  deploy : {
      production : {
          user : 'root',                      //ssh 用户
          host : '47.110.42.110',              //ssh 地址
          ref  : 'origin/master',             //GIT远程/分支
          repo : 'git@github.com:zzcwill/egg-shop-mongo.git',   //git地址
          path : '/usr/app/egg-shop-mongo',       //服务器文件路径
          'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',  //部署后的动作
          env  : {
            NODE_ENV: "production"
          }
      }
  }
};