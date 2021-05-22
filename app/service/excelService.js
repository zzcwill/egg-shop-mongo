'use strict'

const Service = require('egg').Service
// 引入exceljs
const Excel = require('exceljs')
const contentDisposition = require('content-disposition');

class excelService extends Service {
  constructor(prop) {
    super(prop)
    this.defaultViews = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 1,
        visibility: 'visible',
      },
    ]
    this.fontName = '宋体'
    this.font = { name: this.fontName, family: 4, size: 12 }
    this.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EEEEEE' } }
    this.border = { style: 'thin', color: { argb: 'EEEEEE' } }
  }
  /**
   * 导出excel
   * @param { Object } config 传入的excel对象
   * @param { Array } config.data excel的数据
   * @param { String } config.filename excel文件名
   * @param { Array } config.header excel的头部
   * @param { String } config.sheetName 表名
   * @param { Array } config.imageKeys 需要转化图片的key
   * @param { String } config.creator 创建表的人
   * @param { String } config.lastModifiedBy 最后修改表的人
   * @param { String } config.imageKeys.imgWidth 图片的宽度
   * @param { String } config.imageKeys.imgHeight 图片的高度
   * */
  async exportExcel({
    data = [],
    filename = 'file',
    header,
    sheetName = 'sheet1',
    imageKeys = [],
    creator = 'me',
    lastModifiedBy = 'her',
  }) {
    const { ctx } = this
    const workbook = new Excel.Workbook()
    // 设置属性 -创建着以及最后修改的人
    workbook.creator = creator
    workbook.lastModifiedBy = lastModifiedBy

    // 时间获取一次就好
    const now = new Date()
    workbook.created = now
    workbook.modified = now
    workbook.lastPrinted = now
    const worksheet = workbook.addWorksheet(sheetName)
    // 设置打开时候的视图-设置位置
    workbook.views = this.defaultViews
    // 使工作表可见
    worksheet.state = 'visible'
    worksheet.columns = header

    for (let i = 1; i <= header.length; i++) {
      worksheet.getColumn(i).alignment = { vertical: 'middle', horizontal: 'center' }
      worksheet.getColumn(i).font = { name: 'Arial Unicode MS' }
    }
    worksheet.addRows(data)
    // 处理图片
    const imageList = this.getImageList(imageKeys, data, header)
    // 添加图片到sheet
    await this.addPicToSheet(imageList, imageKeys, workbook, worksheet)
    // 多级表头
    const headerOPtion = header.filter((item, index) => {
      if (item.type && item.type === 'multi') {
        header.splice(index, 1)
        return item
      }
      return item.type && item.type === 'multi'
    })
    // 多级表头重置设置表头
    if (headerOPtion.length) {
      headerOPtion[0].headerText.forEach((text, index) => {
        const borderAttr = { top: this.border, left: this.border, bottom: this.border, right: this.border, index }
        const headerAttr = [
          {
            attr: 'values',
            value: text,
          },
          {
            attr: 'font',
            value: this.font,
          },
          {
            attr: 'fill',
            value: this.fill,
          },
          {
            attr: 'border',
            value: borderAttr,
          },
        ]
        headerAttr.map(item => {
          worksheet.getRow(index + 1)[item.attr] = item.value
          return worksheet
        })
      })
      headerOPtion[0].mergeOption.forEach(merge => {
        worksheet.mergeCells(merge)
      })
    } else {
      // 设置表头样式
      worksheet.getRow(1).font = this.font
      worksheet.getRow(1).fill = this.fill
    }
    const bufferContent = await workbook.xlsx.writeBuffer()

    // 设置
    // ctx.set('Content-disposition', `attachment;filename=${filename}.xlsx`)
    ctx.set('Content-Disposition', contentDisposition(`${filename}.xlsx`));
    // 返回文件buffer
    ctx.body = bufferContent
  }
  // 设置图片大小
  getImageList(imageKeys, data, header) {
    return imageKeys.map(
      key => data.map(
        (item, index) => ({
          key,
          url: item[key.name],
          col: this.app.utils.index.getIndexByKey(header, key.name) + 1,
          row: index + 2,
          width: key.imgWidth,
          height: key.imgHeight,
        })
      )
    )
  }
  // 添加图片到sheet
  async addPicToSheet(imageList, imageKeys, workbook, worksheet) {
    if (imageKeys.length > 0) {
      await Promise.all(imageList.map(async imgArr => {
        return await Promise.all(imgArr.map(item => {
          const { url, width, height, row, col } = item
          // 因为有的图片是不存在的需要判断
          if (url) {
            return this.app.utils.index.getBase64(url, this.ctx).then(res => {
              if (!url) return
              const imgType = url.split('?')[0].substring(url.split('?')[0].lastIndexOf('.') + 1).toLowerCase()
              const id = workbook.addImage({
                base64: res,
                extension: imgType,
              })
              worksheet.addImage(id, {
                tl: { col: col - 1, row: row - 1 },
                ext: { width, height },
              })
              worksheet.getRow(row).height = height
              // // 去掉背景链接
              worksheet.getRow(row).getCell(item.key.name).value = ''
            })
          }
          return item
        }))
      }))
    }
  }
}

module.exports = excelService