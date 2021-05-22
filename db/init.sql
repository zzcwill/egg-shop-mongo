DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `menu_name` varchar(200) DEFAULT NULL COMMENT '菜单名，如 客户管理',
  `url` varchar(200) DEFAULT NULL COMMENT '菜单链接地址',
  `parent_id` int(11) DEFAULT NULL COMMENT '父模块ID',
  `orders` int(11) DEFAULT NULL COMMENT '序号，排序用',
  `logo_tag` varchar(200) DEFAULT NULL COMMENT 'LOGO标识',
  `level` int(11) DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',	
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='菜单表';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(11) NOT NULL COMMENT '用户名，现统一为手机号',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `salt` varchar(255) NOT NULL COMMENT '密码加密盐值',
  `realname` varchar(200) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别 1男 0女',
  `age` int(2) DEFAULT NULL COMMENT '年龄',
  `level` int(11) DEFAULT NULL COMMENT '用户级别',
  `shop_id` int(11) DEFAULT '1' COMMENT '门店id',
  `shop_name` varchar(200) DEFAULT '意法2067' COMMENT '门店名',
  `is_on_duty` tinyint(1)  NOT NULL DEFAULT 1 COMMENT '是否在岗',
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
	`modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `last_login_time` timestamp DEFAULT NULL COMMENT '上次登录时间',
  `openid` varchar(200) DEFAULT NULL COMMENT '微信用户openid',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `ukey_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(200) NOT NULL COMMENT '角色名称',
  `role_code` varchar(200) NOT NULL COMMENT '角色编码',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '使用状态',  
  `note` varchar(200) DEFAULT NULL COMMENT '说明',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `key_user_id` (`user_id`) USING BTREE,
  KEY `key_role_id` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `menu_id` int(11) NOT NULL COMMENT '菜单ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `key_role_id` (`role_id`) USING BTREE,
  KEY `key_menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=121536 DEFAULT CHARSET=utf8 COMMENT='角色菜单关联表';

DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(200) NOT NULL COMMENT '店铺',
  `status` tinyint(1) DEFAULT 1 COMMENT '启用1 停用0',
  `note` varchar(200) DEFAULT NULL COMMENT '说明',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='商铺表';

DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `file_type` varchar(200) NOT NULL COMMENT '图片类型',
  `file_size` bigint(64) DEFAULT NULL COMMENT '图片大小',
  `file_url` varchar(200) NOT NULL COMMENT '图片url',
  `file_name` varchar(200) DEFAULT NULL COMMENT '文件名',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '是否删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片表';

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `goods_code` varchar(200) NOT NULL COMMENT '商品编号',
  `goods_price` decimal(10,2) DEFAULT NULL COMMENT '零售价格',
	`goods_size` varchar(200) DEFAULT NULL COMMENT '商品尺寸',
	`goods_brand` varchar(200) DEFAULT NULL COMMENT '商品品牌',
	`goods_color` varchar(200) DEFAULT NULL COMMENT '商品颜色',
	`goods_cost_price` decimal(10,2) NOT NULL COMMENT '进货价',
	`goods_trade_price` decimal(10,2) DEFAULT NULL COMMENT '批发价',
  `goods_sex` tinyint(1)  NOT NULL DEFAULT 1 COMMENT '鞋类型 1男鞋 0 女鞋',
	`goods_note` varchar(200) DEFAULT NULL COMMENT '描述',
  `goods_images` json DEFAULT NULL COMMENT '商品图片 {[id,url]}',
  `is_deleted` tinyint(1) DEFAULT 0 COMMENT '是否删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ukey_goods_code` (`goods_code`, `goods_color`, `goods_sex`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品表';

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户Id',
  `name` varchar(200) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否启用(0:停用;1:启用)',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ukey_name` (`name`) USING BTREE COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='客户表';

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品Id',
	`order_code` varchar(200) NOT NULL COMMENT '流水号',
  `customer_id` int(11) NOT NULL COMMENT '客户Id',
  `shop_id` int(11) NOT NULL COMMENT '店铺Id',

  `customer_name` varchar(200) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '发货手机号',
	`address` varchar(200) DEFAULT NULL COMMENT '详细地址',

	`sale_type` tinyint(2) NOT NULL COMMENT '1零售 2批发 3代卖',
  `express_fee` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '快递费',
	`order_fee` decimal(10,2) NOT NULL COMMENT '订单实际总额',
  `order_discount_fee` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '订单优惠总额',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key_order_code` (`order_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单表';

DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单详情表id',
	`order_id` int(11) NOT NULL COMMENT '订单id',
  `goods_id` int(11) NOT NULL COMMENT '商品id',
	`num` int(11) NOT NULL COMMENT '商品数量',
	`actual_price` decimal(10,2) NOT NULL COMMENT '商品实际单价',
  `actual_fee` decimal(10,2) NOT NULL COMMENT '该商品实际总额',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key_order_id` (`order_id`) USING BTREE,
  KEY `key_goods_id` (`goods_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='订单详情表';

-- 目前只有销量表
-- 后期加进货表，退货表
