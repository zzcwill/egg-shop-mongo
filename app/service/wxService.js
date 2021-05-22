'use strict';

const Service = require('egg').Service;
const sha1 = require('sha1');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
const builder = new xml2js.Builder({ headless: true, cdata: true, explicitRoot: false, rootName: 'xml' });

const axios = require('axios');

// 订阅号
// const appid = 'wxe2a7c21fe894a92d';
// const appSecret = '0b3a16c1661914fa41397a64875ec534';

// test服务号
const appid = 'wxe232456cb62be35a';
const appSecret = 'c38c2a1187ca07e4b6077a3c9aa2abde';

class wxService extends Service {
  async authWechatMsg(query) {
    let { signature, echostr, timestamp, nonce } = query;

    const token = 'token'; // 这个地方就是公众平台上所谓的token 必须一样

    // 将token、timestamp、nonce三个参数进行字典序排序
    const arr = [token, timestamp, nonce];
    arr.sort();

    const str = arr.join('');
    const shaStr = sha1(str);

    if (shaStr !== signature) {
      return false;
    }

    if (shaStr === signature) {
      return echostr
    }
  }
  async wechatMsg(msgbufer) {
    let toData = {
      error: '',
      // 默认数据返回为空，不能微信会重推3次
      data: ''
    }
    return new Promise((resolve, reject) => {
      parser.parseString(msgbufer.toString(), async function (err, result) {
        if (err) {
          toData.error = err
          resolve(toData);
        }
        var baseData = {
          ToUserName: result.FromUserName,
          FromUserName: result.ToUserName,
          CreateTime: Date.now(),
        }

        switch (result.MsgType) {
          case 'text':
            switch (result.Content.toLowerCase()) {
              case 'test':
                // 返回帮助内容
                var helpTxt = [
                  '1 test1',
                  '2 test2'
                ]
                var data = Object.assign({
                  MsgType: 'text',
                  Content: helpTxt.join('\n'),
                }, baseData);

                toData.data = builder.buildObject(data);

                resolve(toData);
                break;
              default:
                resolve(toData);
                break;
            }
            break;
          case 'event':
            if (result.Event === 'subscribe') {
              console.info(result)

              // 二维码场景值进入
              if (result.EventKey) {
                // 自己定义scene_str-场景值  qrscene_ + scene_str
                let sceneIdArr = result.EventKey.split('_')
                let scene_str = sceneIdArr[1];

                console.info( 'scene_str:' + scene_str)

                let data = Object.assign({
                  MsgType: 'news',
                  ArticleCount: 1,
                  Articles: {
                    item: {
                      Title: 'testcode',
                      Description: '未关注点击关注的用户推送',
                      PicUrl: 'http://47.110.42.110:3301/static/img/1.29a2929d.jpg',
                      Url: 'http://zzc.cdreamy.cn/bindok' + '?scene_str=' + scene_str,
                    },
                  },
                }, baseData);
                toData.data = builder.buildObject(data);
              }

              // 普通关注
              if(!result.EventKey) {
                var data = Object.assign({
                  MsgType: 'news',
                  ArticleCount: 1,
                  Articles: {
                    item: {
                      Title: 'test',
                      Description: 'test',
                      PicUrl: 'http://47.110.42.110:3301/static/img/1.29a2929d.jpg',
                      Url: 'https://www.baidu.com/',
                    },
                  },
                }, baseData);
  
                toData.data = builder.buildObject(data);
              }

              resolve(toData);
            }
            // 已关注
            if (result.Event === 'SCAN') {
              console.info(result)

              // 二维码场景值进入
              if (result.EventKey) {
                // 自己定义scene_str-场景值  qrscene_ + scene_str
                let sceneIdArr = result.EventKey.split('_')
                let scene_str = sceneIdArr[1];

                console.info( 'scene_str:' + scene_str)

                let data = Object.assign({
                  MsgType: 'news',
                  ArticleCount: 1,
                  Articles: {
                    item: {
                      Title: 'testcode',
                      Description: '已关注的用户推送',
                      PicUrl: 'http://47.110.42.110:3301/static/img/1.29a2929d.jpg',
                      Url: 'http://zzc.cdreamy.cn/bindok' + '?scene_str=' + scene_str,
                    },
                  },
                }, baseData);
                toData.data = builder.buildObject(data);
              }

              resolve(toData);
            }
            if (result.Event === 'TEMPLATESENDJOBFINISH') {
              // 主动叫微信发送消息-微信在通知我用户是否收到消息
              console.info(result)
              resolve(toData);
            }
            resolve(toData);
            break;
          default:
            resolve(toData);
            break;
        }
      });
    });

  }

  //获取微信公众号-接口凭证
  async getAccessToken() {
    const { cache } = this.service;

    let toUrl = 'https://api.weixin.qq.com/cgi-bin/token';
    let paramData = '?appid=' + appid + '&secret=' + appSecret + '&grant_type=' + 'client_credential'
    let wechatdata = await axios({
      method: 'get',
      url: toUrl + paramData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await cache.set('access_token', wechatdata.data.access_token, wechatdata.data.expires_in);
  }

  // 通知微信-推送某一用户消息
  async sendMsgToWx(openid, access_token, user) {
    let { dayjs } = this.ctx.helper

    let isOK = 0

    let toUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token;
    let wechatdata = await axios({
      method: 'post',
      url: toUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        touser: openid,
        template_id: 'SlFBkMkNJqIqFbaBsM2tgb-qZr-Fx-0WUXhtZraxlhU',
        url: 'http://zzc.cdreamy.cn/bindok',
        data: {
          User: {
            value: user.username,
            color: '#173177'
          },
          Date: {
            value: dayjs().format('YYYY-MM-DD'),
            color: '#173177'
          }
        }
      }
    });
    // console.info(wechatdata)
    if (wechatdata.data.errcode === 0) {
      isOK = 1
    }
    return isOK
  }

  // 获取带场景二维码
  async getWechatQrCode(access_token, user) {
    let { dayjs } = this.ctx.helper

    let toData = {
      isOK: 0,
      ticket: '',
      url: '',
      qrcodeImgUrl: ''
    }

    let toUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=' + access_token;
    let wechatdata = await axios({
      method: 'post',
      url: toUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        action_name: 'QR_LIMIT_STR_SCENE',
        action_info: {
          scene: { scene_str: user.username + '-' + user.uid }
        }
      }
    });
    console.info( 'scene_str:' + user.username + '-' + user.uid)
    console.info(wechatdata.data)
    if(!wechatdata.data.ticket) {
      return toData
    }
    toData = {
      isOK: 1,
      ticket: wechatdata.data.ticket,
      url: wechatdata.data.url,
      qrcodeImgUrl: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + wechatdata.data.ticket
    }
    return toData
  }
}

module.exports = wxService;