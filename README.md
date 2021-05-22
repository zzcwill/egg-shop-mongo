# user-admin



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:3000/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### docker部署相关
#### 打包本地镜像
docker image build -t egg-shop-mongo .
#### docker login
docker login
#### 为本地镜像打标签，tag 不写默认为 latest
docker image tag egg-shop-mongo zhengzhichao/egg-shop-mongo:1.0
#### 发布镜像文件
docker image push zhengzhichao/egg-shop-mongo:1.0
#### 服务器拉镜像文件
docker login
docker pull zhengzhichao/egg-shop-mongo:1.0
#### 跑版本镜像为容器
docker run -p 3000:3000 --name egg-shop-mongo -d zhengzhichao/egg-shop-mongo:1.0

### 如何pm2部署
服务器，git拉仓库
git pull
npm install
放config.prod.js文件
3000-3001
pm2 start ecosystem.config.js --env production
查看控制台
pm2 log 0