'use strict';

const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const contentDisposition = require('content-disposition');


const { Controller } = require('egg');

class ExcelController extends Controller {
  // 定义excel的头部
  constructor(prop) {
    super(prop)
    this.header = [
      { header: '订单编号', key: 'order_code', width: 25 },
      { header: '客户名称', key: 'customer_name', width: 25 },
      { header: '创建时间', key: 'create_time', width: 25 },
    ]
  }

  async get() {
    const { ctx, service, config } = this;

    ctx.set('Content-Disposition', contentDisposition('excel.xlsx'));

    let url = path.resolve(__dirname, '../../public/excel/demo.xlsx');

    let excelData = xlsx.parse(fs.readFileSync(url));

    // console.info(excelData[0].data[0])
    let data1 = [
      'zzc', '18042434282', '10', '1000', '2021-02-22'
    ]

    excelData[0].data.push(data1);

    const options = { '!cols': [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }] };
    let buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }], options);
    ctx.body = buffer;

  }
  async get2() {
    const { ctx, service, config } = this;

    let url = '/public/excel/demo.xlsx'
    ctx.redirect(url)
  }
  async exportOrder() {
    const { ctx, service, config } = this;
    const { resOk } = ctx.helper.resData;
    const { setToken } = ctx.helper.token;
    const { orderService, goodsService } = service;
    const { checkParam, lodash } = ctx.helper;
    const { getOrderCode } = ctx.helper.order;
    const { Forbidden, ParameterException } = ctx.helper.httpCode;

    let ruleData = {
      page: [
        {
          ruleName: 'required',
          rule: (val) => {
            var isOk = true
            if (!val) {
              isOk = false
            }
            return isOk
          }
        },
      ],
      pageSize: [
        {
          ruleName: 'required',
          rule: (val) => {
            var isOk = true
            if (!val) {
              isOk = false
            }
            return isOk
          }
        },
      ]
    }
    let msgParam = checkParam.check(ctx, ruleData)
    if (msgParam) {
      let error = new ParameterException(msgParam)
      throw error;
      return
    }

    let getData = ctx.request.query;
    getData.page = lodash.toFinite(getData.page)
    getData.pageSize = lodash.toFinite(getData.pageSize)

    let listData = await orderService.list(getData);

    ctx.set('Content-Disposition', contentDisposition('excel.xlsx'));

    let url = path.resolve(__dirname, '../../public/excel/order.xlsx');

    let excelData = xlsx.parse(fs.readFileSync(url));

    // console.info(excelData[0].data[0])

    listData.list.map(async (item)=> {
      let data1 = [
        item.order_code, item.customer_name, item.create_time
      ] 
      excelData[0].data.push(data1);     
    })

    const options = { '!cols': [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }] };
    let buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }], options);
    ctx.body = buffer;
  }
  async exportOrder2() {
    const { ctx, service, config } = this;
    const { resOk } = ctx.helper.resData;
    const { setToken } = ctx.helper.token;
    const { orderService, goodsService } = service;
    const { checkParam, lodash } = ctx.helper;
    const { getOrderCode } = ctx.helper.order;
    const { Forbidden, ParameterException } = ctx.helper.httpCode;

    let ruleData = {
      page: [
        {
          ruleName: 'required',
          rule: (val) => {
            var isOk = true
            if (!val) {
              isOk = false
            }
            return isOk
          }
        },
      ],
      pageSize: [
        {
          ruleName: 'required',
          rule: (val) => {
            var isOk = true
            if (!val) {
              isOk = false
            }
            return isOk
          }
        },
      ]
    }
    let msgParam = checkParam.check(ctx, ruleData)
    if (msgParam) {
      let error = new ParameterException(msgParam)
      throw error;
      return
    }

    let getData = ctx.request.query;
    getData.page = lodash.toFinite(getData.page)
    getData.pageSize = lodash.toFinite(getData.pageSize)

    let listData = await orderService.list(getData);

    const baseExcelInfo = {
      data: listData.list,
      filename: '订单报表',
      header: this.header,
      sheetName: 'sheet1',
    }
    await service.excelService.exportExcel(baseExcelInfo)
  }  
}

module.exports = ExcelController;
