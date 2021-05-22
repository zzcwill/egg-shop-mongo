FROM node:12.18.3-alpine

# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata

RUN mkdir -p /usr/app/egg-shop-mongo/node/

WORKDIR /usr/app/egg-shop-mongo/node/

# add npm package
COPY package.json /usr/app/egg-shop-mongo/node/package.json
RUN cd /usr/app/egg-shop-mongo/node/
RUN npm i --production

# RUN npm i --production --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/app/egg-shop-mongo/node/

EXPOSE 3000

CMD npm run start
