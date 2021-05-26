/*
 Navicat Premium Data Transfer

 Source Server         : mysql-aliyun
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : 47.110.42.110:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 26/05/2021 12:05:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '客户Id',
  `name` varchar(200) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用(0:停用;1:启用)',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ukey_name` (`name`) USING BTREE COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='客户表';

-- ----------------------------
-- Records of customer
-- ----------------------------
BEGIN;
INSERT INTO `customer` VALUES (1, '不留名客户', NULL, NULL, 1, '2021-04-30 16:14:09', '2021-04-30 16:14:09');
INSERT INTO `customer` VALUES (2, '华贸B1-802', '18758871786', '浙江省杭州市江干区华贸鞋城B-802号', 1, '2021-04-30 16:15:15', '2021-04-30 16:17:58');
INSERT INTO `customer` VALUES (3, ' 小郑', '18042434282', '浙江省杭州江干区香滨湾花园10幢2单元', 1, '2021-04-30 16:18:44', '2021-05-10 15:27:05');
INSERT INTO `customer` VALUES (4, '批发客户', '18042434280', '浙江省嘉兴市天虹商场1楼', 1, '2021-04-30 16:19:06', '2021-04-30 16:20:07');
COMMIT;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `file_type` varchar(200) NOT NULL COMMENT '图片类型',
  `file_size` bigint DEFAULT NULL COMMENT '图片大小',
  `file_url` varchar(200) NOT NULL COMMENT '图片url',
  `file_name` varchar(200) DEFAULT NULL COMMENT '文件名',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '是否删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COMMENT='图片表';

-- ----------------------------
-- Records of file
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `goods_code` varchar(200) NOT NULL COMMENT '商品编号',
  `goods_price` decimal(10,2) DEFAULT NULL COMMENT '零售价格',
  `goods_size` varchar(200) DEFAULT NULL COMMENT '商品尺寸',
  `goods_brand` varchar(200) DEFAULT NULL COMMENT '商品品牌',
  `goods_color` varchar(200) DEFAULT NULL COMMENT '商品颜色',
  `goods_cost_price` decimal(10,2) NOT NULL COMMENT '进货价',
  `goods_trade_price` decimal(10,2) DEFAULT NULL COMMENT '批发价',
  `goods_sex` tinyint(1) NOT NULL DEFAULT '1' COMMENT '鞋类型 1男鞋 0 女鞋',
  `goods_note` varchar(200) DEFAULT NULL COMMENT '描述',
  `goods_images` json DEFAULT NULL COMMENT '商品图片 {[id,url]}',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '是否删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ukey_goods_code` (`goods_code`,`goods_color`,`goods_sex`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='商品表';

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES (1, 'qd2001', NULL, '36-40', '花花公子', '米紫', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (2, 'qd2001', NULL, '36-40', '花花公子', '黑粉', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (3, 'th10011', NULL, '39-44', '花花公子', '黑金', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (4, 'th10011', NULL, '39-44', '花花公子', '浅米茶', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (5, 'th10011', NULL, '39-44', '花花公子', '黑白', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (6, 'th10011', NULL, '39-44', '花花公子', '中灰', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (7, 'th1008', NULL, '39-44', '花花公子', '浅米', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (8, 'th1008', NULL, '39-44', '花花公子', '黑白', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (9, 'th1008', NULL, '39-44', '花花公子', '黑金', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (10, 'th1009', NULL, '39-44', '花花公子', '浅灰', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (11, 'th1009', NULL, '39-44', '花花公子', '黑金', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (12, 'th1009', NULL, '39-44', '花花公子', '黑白', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (13, 'th13001', NULL, '36-40', '花花公子', '黑玫红', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (14, 'th13001', NULL, '36-40', '花花公子', '米紫', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (15, 'th2006', NULL, '39-44', '花花公子', '黑绿', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (16, 'th2006', NULL, '39-44', '花花公子', '米色', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (17, 'th2006', NULL, '39-44', '花花公子', '黑红', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (18, 'th3001', NULL, '36-40', '花花公子', '紫色', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (19, 'th3002', NULL, '36-40', '花花公子', '米色', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (20, 'th3003', NULL, '36-40', '花花公子', '米紫', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (21, 'th3003', NULL, '36-40', '花花公子', '黑粉', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (22, 'th3009', NULL, '36-40', '花花公子', '紫色', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (23, 'th3009', NULL, '36-40', '花花公子', '米紫', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (24, 'th3009', NULL, '36-40', '花花公子', '黑金', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (25, 'th3009', NULL, '36-40', '花花公子', '黑亮红', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (26, 'th3010', NULL, '36-40', '花花公子', '黑粉', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (27, 'th3010', NULL, '36-40', '花花公子', '紫色', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (28, 'th3010', NULL, '36-40', '花花公子', '黑白', 80.00, NULL, 0, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (29, 'th3010', NULL, '39-44', '花花公子', '紫色', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
INSERT INTO `goods` VALUES (30, 'th3010', NULL, '39-44', '花花公子', '黑白', 90.00, NULL, 1, NULL, NULL, 0, '2021-05-07 14:00:04', '2021-05-07 14:00:04');
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `menu_name` varchar(200) DEFAULT NULL COMMENT '菜单名，如 客户管理',
  `url` varchar(200) DEFAULT NULL COMMENT '菜单链接地址',
  `parent_id` int DEFAULT NULL COMMENT '父模块ID',
  `orders` int DEFAULT NULL COMMENT '序号，排序用',
  `logo_tag` varchar(200) DEFAULT NULL COMMENT 'LOGO标识',
  `level` int DEFAULT NULL COMMENT '保留字段，菜单级别-1,2,3',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COMMENT='菜单表';

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (1, '订单管理', NULL, NULL, NULL, NULL, 1, '2021-04-30 16:04:18', '2021-04-30 16:04:18');
INSERT INTO `menu` VALUES (2, '报表管理', NULL, NULL, NULL, NULL, 1, '2021-04-30 16:04:38', '2021-04-30 16:04:38');
INSERT INTO `menu` VALUES (3, '系统管理', NULL, NULL, NULL, NULL, 1, '2021-04-30 16:04:58', '2021-04-30 16:04:58');
INSERT INTO `menu` VALUES (4, '销售管理', NULL, 1, NULL, NULL, 2, '2021-04-30 16:05:16', '2021-04-30 16:05:56');
INSERT INTO `menu` VALUES (5, '厂家进货管理', NULL, 1, NULL, NULL, 2, '2021-04-30 16:05:28', '2021-04-30 16:05:58');
INSERT INTO `menu` VALUES (6, '退货管理', NULL, 1, NULL, NULL, 2, '2021-04-30 16:05:40', '2021-04-30 16:05:59');
INSERT INTO `menu` VALUES (7, '销售报表', NULL, 2, NULL, NULL, 2, '2021-04-30 16:06:37', '2021-04-30 16:06:37');
INSERT INTO `menu` VALUES (8, '厂家进货报表', NULL, 2, NULL, NULL, 2, '2021-04-30 16:06:51', '2021-04-30 16:06:51');
INSERT INTO `menu` VALUES (9, '退货报表', NULL, 2, NULL, NULL, 2, '2021-04-30 16:07:03', '2021-04-30 16:07:03');
COMMIT;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品Id',
  `order_code` varchar(200) NOT NULL COMMENT '流水号',
  `customer_id` int NOT NULL COMMENT '客户Id',
  `shop_id` int NOT NULL COMMENT '店铺Id',
  `customer_name` varchar(200) NOT NULL COMMENT '客户姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '发货手机号',
  `address` varchar(200) DEFAULT NULL COMMENT '详细地址',
  `sale_type` tinyint NOT NULL COMMENT '1零售 2批发 3代卖',
  `express_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '快递费',
  `order_fee` decimal(10,2) NOT NULL COMMENT '订单实际总额',
  `order_discount_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单优惠总额',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key_order_code` (`order_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='订单表';

-- ----------------------------
-- Records of order
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES (87, '20210519063317shoe2', 3, 1, ' 小郑', '18042434282', '浙江省杭州江干区香滨湾花园', 1, 0.00, 2000.00, 0.00, '2021-05-19 06:33:17', '2021-05-21 01:33:25', 0);
INSERT INTO `order` VALUES (97, '20210521085221shoe1', 1, 1, '不留名客户', '', '', 1, 10.00, 800.00, 0.00, '2021-05-21 12:52:21', '2021-05-21 12:52:21', 0);
INSERT INTO `order` VALUES (98, '20210521090123shoe1', 1, 1, '不留名客户', '', '', 1, 10.00, 800.00, 0.00, '2021-05-21 13:01:23', '2021-05-21 13:01:23', 0);
INSERT INTO `order` VALUES (99, '20210521090339shoe2', 1, 1, '不留名客户', '', '', 1, 10.00, 800.00, 0.00, '2021-05-21 13:03:39', '2021-05-21 13:03:39', 0);
COMMIT;

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '订单详情表id',
  `order_id` int NOT NULL COMMENT '订单id',
  `goods_id` int NOT NULL COMMENT '商品id',
  `num` int NOT NULL COMMENT '商品数量',
  `actual_price` decimal(10,2) NOT NULL COMMENT '商品实际单价',
  `actual_fee` decimal(10,2) NOT NULL COMMENT '该商品实际总额',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `key_order_id` (`order_id`) USING BTREE,
  KEY `key_goods_id` (`goods_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='订单详情表';

-- ----------------------------
-- Records of order_info
-- ----------------------------
BEGIN;
INSERT INTO `order_info` VALUES (171, 87, 2, 10, 200.00, 2000.00, '2021-05-19 06:33:17', '2021-05-19 06:33:17', 0);
INSERT INTO `order_info` VALUES (190, 97, 1, 4, 100.00, 400.00, '2021-05-21 12:52:21', '2021-05-21 12:52:21', 0);
INSERT INTO `order_info` VALUES (191, 97, 2, 4, 100.00, 400.00, '2021-05-21 12:52:21', '2021-05-21 12:52:21', 0);
INSERT INTO `order_info` VALUES (192, 98, 1, 4, 100.00, 400.00, '2021-05-21 13:01:23', '2021-05-21 13:01:23', 0);
INSERT INTO `order_info` VALUES (193, 98, 2, 4, 100.00, 400.00, '2021-05-21 13:01:23', '2021-05-21 13:01:23', 0);
INSERT INTO `order_info` VALUES (194, 99, 1, 4, 100.00, 400.00, '2021-05-21 13:03:39', '2021-05-21 13:03:39', 0);
INSERT INTO `order_info` VALUES (195, 99, 2, 4, 100.00, 400.00, '2021-05-21 13:03:39', '2021-05-21 13:03:39', 0);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(200) NOT NULL COMMENT '角色名称',
  `role_code` varchar(200) NOT NULL COMMENT '角色编码',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '使用状态',
  `note` varchar(200) DEFAULT NULL COMMENT '说明',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, '管理员', 'admin', 1, NULL, '2021-04-30 15:37:15', '2021-04-30 15:37:15');
INSERT INTO `role` VALUES (2, '普通用户', 'user', 1, NULL, '2021-04-30 15:37:34', '2021-04-30 15:37:51');
COMMIT;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int NOT NULL COMMENT '角色ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `key_role_id` (`role_id`) USING BTREE,
  KEY `key_menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COMMENT='角色菜单关联表';

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` VALUES (1, 1, 1, '2021-04-30 16:03:50', '2021-04-30 16:03:50');
INSERT INTO `role_menu` VALUES (2, 1, 2, '2021-04-30 16:09:07', '2021-04-30 16:09:07');
INSERT INTO `role_menu` VALUES (3, 1, 4, '2021-04-30 16:09:53', '2021-04-30 16:09:53');
INSERT INTO `role_menu` VALUES (4, 1, 5, '2021-04-30 16:10:00', '2021-04-30 16:10:00');
INSERT INTO `role_menu` VALUES (5, 1, 6, '2021-04-30 16:10:08', '2021-04-30 16:10:08');
INSERT INTO `role_menu` VALUES (6, 1, 7, '2021-04-30 16:10:14', '2021-04-30 16:10:19');
INSERT INTO `role_menu` VALUES (7, 1, 8, '2021-04-30 16:10:47', '2021-04-30 16:10:47');
INSERT INTO `role_menu` VALUES (8, 1, 9, '2021-04-30 16:10:54', '2021-04-30 16:10:54');
INSERT INTO `role_menu` VALUES (9, 2, 1, '2021-04-30 16:03:50', '2021-04-30 16:03:50');
INSERT INTO `role_menu` VALUES (10, 2, 4, '2021-04-30 16:09:53', '2021-04-30 16:09:53');
INSERT INTO `role_menu` VALUES (11, 2, 5, '2021-04-30 16:10:00', '2021-04-30 16:10:00');
INSERT INTO `role_menu` VALUES (12, 2, 6, '2021-04-30 16:10:08', '2021-04-30 16:10:08');
COMMIT;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(200) NOT NULL COMMENT '店铺',
  `status` tinyint(1) DEFAULT '1' COMMENT '启用1 停用0',
  `note` varchar(200) DEFAULT NULL COMMENT '说明',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COMMENT='商铺表';

-- ----------------------------
-- Records of shop
-- ----------------------------
BEGIN;
INSERT INTO `shop` VALUES (1, '意法2067', 1, NULL, '2021-04-30 16:13:11', '2021-04-30 16:13:11');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(11) NOT NULL COMMENT '用户名，现统一为手机号',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `salt` varchar(255) NOT NULL COMMENT '密码加密盐值',
  `realname` varchar(200) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别 1男 0女',
  `age` int DEFAULT NULL COMMENT '年龄',
  `level` int DEFAULT NULL COMMENT '用户级别',
  `shop_id` int DEFAULT '1' COMMENT '门店id',
  `shop_name` varchar(200) DEFAULT '意法2067' COMMENT '门店名',
  `is_on_duty` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否在岗',
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '上次登录时间',
  `openid` varchar(200) DEFAULT NULL COMMENT '微信用户openid',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `ukey_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'root', '$2a$10$mHM8qhUmY9CkppRP537cwO01TOVEbALdtURKZQtYJcGPcWB8LCl/6', '$2a$10$mHM8qhUmY9CkppRP537cwO', NULL, NULL, NULL, NULL, NULL, NULL, 1, '意法2067', 1, '2021-04-30 15:35:53', '2021-04-30 15:36:17', NULL, NULL);
INSERT INTO `user` VALUES (2, 'zzc', '$2a$10$KFqusKgqK1kWOqwy.FUYce2VLyXboUl/tOTJkbiu8UlK4eksXjaFe', '$2a$10$KFqusKgqK1kWOqwy.FUYce', NULL, NULL, NULL, NULL, NULL, NULL, 1, '意法2067', 1, '2021-04-30 15:33:49', '2021-05-21 04:33:06', NULL, 'ooA6H5ogL-OhLL3qLvDD2p5sQZSQ');
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID',
  `role_id` int NOT NULL COMMENT '角色ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `key_user_id` (`user_id`) USING BTREE,
  KEY `key_role_id` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COMMENT='用户角色关联表';

-- ----------------------------
-- Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO `user_role` VALUES (1, 1, 1, '2021-04-30 15:38:01', '2021-04-30 15:38:01');
INSERT INTO `user_role` VALUES (2, 2, 2, '2021-04-30 15:38:05', '2021-04-30 15:38:05');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
