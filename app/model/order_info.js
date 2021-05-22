'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Order_info = app.model.define(
    'order_info', // 默认表名（一般这里写单数）,生成时会自动转换成复数形式。在模型访问时的model.name
    {
      id: {
        type: Sequelize.INTEGER(11), // 字段类型
        allowNull: false, // 是否允许为NULL
        primaryKey: true, // 字段是主键
        autoIncrement: true, // 是否自增
      },
      goods_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      num: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      actual_price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      actual_fee: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      create_time : {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'order_info', // 手动设置表的实际名称
      timestamps: false, // 是否给每条记录添加 createdAt 和 updatedAt 字段，并在添加新数据和更新数据的时候自动设置这两个字段的值，默认为true
      paranoid: false, // 设置 deletedAt 字段，当删除一条记录的时候，并不是真的销毁记录，而是通过该字段来标示，即保留数据，进行假删除，默认为false
      freezeTableName: false, // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 默认为false
      indexes: [], // 定义表索引
    }
  )

  return Order_info;
};