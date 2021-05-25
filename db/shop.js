/*
 Navicat Premium Data Transfer

 Source Server         : mongo-local
 Source Server Type    : MongoDB
 Source Server Version : 40404
 Source Host           : localhost:27017
 Source Schema         : shop

 Target Server Type    : MongoDB
 Target Server Version : 40404
 File Encoding         : 65001

 Date: 25/05/2021 14:32:03
*/


// ----------------------------
// Collection structure for customer
// ----------------------------
db.getCollection("customer").drop();
db.createCollection("customer");
db.getCollection("customer").createIndex({
    name: NumberInt("1")
}, {
    name: "ukey_name",
    background: true,
    unique: true
});

// ----------------------------
// Documents of customer
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("customer").insert([ {
    _id: ObjectId("60ac989fa6698f145d361134"),
    id: 1,
    name: "不留名客户",
    status: 1,
    address: null,
    phone: null,
    "create_time": "2021-04-30 16:14:09",
    "modify_time": "2021-04-30 16:14:09"
} ]);
db.getCollection("customer").insert([ {
    _id: ObjectId("60ac9968a6698f145d361135"),
    id: 2,
    name: "华贸",
    status: 1,
    address: null,
    phone: null,
    "create_time": "2021-04-30 16:14:09",
    "modify_time": "2021-04-30 16:14:09"
} ]);
db.getCollection("customer").insert([ {
    _id: ObjectId("60ac9990a6698f145d361136"),
    id: 3,
    name: "小郑",
    status: 1,
    address: null,
    phone: null,
    "create_time": "2021-04-30 16:14:09",
    "modify_time": "2021-04-30 16:14:09"
} ]);
db.getCollection("customer").insert([ {
    _id: ObjectId("60ac999da6698f145d361137"),
    id: 4,
    name: "批发客户",
    status: 1,
    address: null,
    phone: null,
    "create_time": "2021-04-30 16:14:09",
    "modify_time": "2021-04-30 16:14:09"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for file
// ----------------------------
db.getCollection("file").drop();
db.createCollection("file");
db.getCollection("file").createIndex({
    "file_url": NumberInt("1")
}, {
    name: "key_file_url",
    background: true
});

// ----------------------------
// Documents of file
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for goods
// ----------------------------
db.getCollection("goods").drop();
db.createCollection("goods");
db.getCollection("goods").createIndex({
    "goods_code": NumberInt("1"),
    "goods_color": NumberInt("1"),
    "goods_sex": NumberInt("1")
}, {
    name: "key_goods_code",
    background: true,
    unique: true
});

// ----------------------------
// Documents of goods
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e3c"),
    "goods_code": "qd2001",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "米紫",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e3d"),
    "goods_code": "qd2001",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑粉",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e3e"),
    "goods_code": "th10011",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑金",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e3f"),
    "goods_code": "th10011",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "浅米茶",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e40"),
    "goods_code": "th10011",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑白",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e41"),
    "goods_code": "th10011",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "中灰",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e42"),
    "goods_code": "th1008",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "浅米",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e43"),
    "goods_code": "th1008",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑白",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e44"),
    "goods_code": "th1008",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑金",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e45"),
    "goods_code": "th1009",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "浅灰",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e46"),
    "goods_code": "th1009",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑金",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e47"),
    "goods_code": "th1009",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑白",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e48"),
    "goods_code": "th13001",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑玫红",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e49"),
    "goods_code": "th13001",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "米紫",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4a"),
    "goods_code": "th2006",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑绿",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4b"),
    "goods_code": "th2006",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "米色",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4c"),
    "goods_code": "th2006",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑红",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4d"),
    "goods_code": "th3001",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "紫色",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4e"),
    "goods_code": "th3002",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "米色",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e4f"),
    "goods_code": "th3003",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "米紫",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e50"),
    "goods_code": "th3003",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑粉",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e51"),
    "goods_code": "th3009",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "紫色",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e52"),
    "goods_code": "th3009",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "米紫",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e53"),
    "goods_code": "th3009",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑金",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e54"),
    "goods_code": "th3009",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑亮红",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e55"),
    "goods_code": "th3010",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑粉",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e56"),
    "goods_code": "th3010",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "紫色",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e57"),
    "goods_code": "th3010",
    "goods_size": "36-40",
    "goods_brand": "花花公子",
    "goods_color": "黑白",
    "goods_cost_price": "80",
    "goods_sex": "0"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e58"),
    "goods_code": "th3010",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "紫色",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("60ac91741469640a3f160e59"),
    "goods_code": "th3010",
    "goods_size": "39-44",
    "goods_brand": "花花公子",
    "goods_color": "黑白",
    "goods_cost_price": "90",
    "goods_sex": "1"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for menu
// ----------------------------
db.getCollection("menu").drop();
db.createCollection("menu");
db.getCollection("menu").createIndex({
    id: NumberInt("1")
}, {
    name: "key_id",
    background: true
});

// ----------------------------
// Documents of menu
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb608631e6e07e92f32d3"),
    id: 1,
    "menu_name": "订单管理",
    level: 1,
    orders: null,
    "parent_id": null,
    url: null,
    "logo_tag": null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb60b631e6e07e92f32d4"),
    id: 2,
    "menu_name": "报表管理",
    level: 1,
    url: null,
    "logo_tag": null,
    orders: null,
    "parent_id": null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb60f631e6e07e92f32d5"),
    id: 3,
    "menu_name": "系统管理",
    level: 1,
    "logo_tag": null,
    orders: null,
    "parent_id": null,
    url: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb612631e6e07e92f32d6"),
    id: 4,
    "menu_name": "销售管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb615631e6e07e92f32d7"),
    id: 5,
    "menu_name": "厂家进货管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb619631e6e07e92f32d8"),
    id: 6,
    "menu_name": "退货管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb61d631e6e07e92f32d9"),
    id: 7,
    "menu_name": "销售报表",
    "parent_id": 2,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb621631e6e07e92f32da"),
    id: 8,
    "menu_name": "厂家进货报表",
    "parent_id": 2,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb626631e6e07e92f32db"),
    id: 9,
    "menu_name": "退货报表",
    "parent_id": 2,
    level: 2,
    "logo_tag": null,
    orders: null,
    url: null
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for order
// ----------------------------
db.getCollection("order").drop();
db.createCollection("order");
db.getCollection("order").createIndex({
    "order_code": NumberInt("1")
}, {
    name: "key_order_code",
    background: true
});

// ----------------------------
// Documents of order
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for order_info
// ----------------------------
db.getCollection("order_info").drop();
db.createCollection("order_info");
db.getCollection("order_info").createIndex({
    "order_id": NumberInt("1")
}, {
    name: "key_order_id",
    background: true
});
db.getCollection("order_info").createIndex({
    "goods_id": NumberInt("1")
}, {
    name: "key_goods_id",
    background: true
});

// ----------------------------
// Documents of order_info
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for role
// ----------------------------
db.getCollection("role").drop();
db.createCollection("role");
db.getCollection("role").createIndex({
    id: NumberInt("1")
}, {
    name: "key_id",
    background: true
});

// ----------------------------
// Documents of role
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("role").insert([ {
    _id: ObjectId("60abb863631e6e07e92f32dd"),
    id: 1,
    name: "管理员",
    "role_code": "admin",
    status: 1,
    note: null,
    "create_time": "2021-04-30 15:35:53",
    "modify_time": "2021-04-30 15:35:53"
} ]);
db.getCollection("role").insert([ {
    _id: ObjectId("60abb871631e6e07e92f32de"),
    id: 2,
    name: "普通用户",
    "role_code": "user",
    status: 1,
    note: null,
    "create_time": "2021-04-30 15:35:53",
    "modify_time": "2021-04-30 15:35:53"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for role_menu
// ----------------------------
db.getCollection("role_menu").drop();
db.createCollection("role_menu");
db.getCollection("role_menu").createIndex({
    "role_id": NumberInt("1")
}, {
    name: "key_role_id",
    background: true
});
db.getCollection("role_menu").createIndex({
    "menu_id": NumberInt("1")
}, {
    name: "key_menu_id",
    background: true
});

// ----------------------------
// Documents of role_menu
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4defab7e942fb23905c4"),
    "role_id": 1,
    "menu_id": 1
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4df4ab7e942fb23905c5"),
    "role_id": 1,
    "menu_id": 2
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4df9ab7e942fb23905c6"),
    "role_id": 1,
    "menu_id": 3
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e06ab7e942fb23905c7"),
    "role_id": 1,
    "menu_id": 4
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e2fab7e942fb23905c8"),
    "role_id": 1,
    "menu_id": 5
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e33ab7e942fb23905c9"),
    "role_id": 1,
    "menu_id": 6
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e38ab7e942fb23905ca"),
    "role_id": 1,
    "menu_id": 7
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e3cab7e942fb23905cb"),
    "role_id": 1,
    "menu_id": 8
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e40ab7e942fb23905cc"),
    "role_id": 2,
    "menu_id": 1
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e4aab7e942fb23905cd"),
    "role_id": 2,
    "menu_id": 4
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e51ab7e942fb23905ce"),
    "role_id": 2,
    "menu_id": 5
} ]);
db.getCollection("role_menu").insert([ {
    _id: ObjectId("60ac4e58ab7e942fb23905cf"),
    "role_id": 2,
    "menu_id": 6,
    "create_time": null
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for shop
// ----------------------------
db.getCollection("shop").drop();
db.createCollection("shop");
db.getCollection("shop").createIndex({
    id: NumberInt("1")
}, {
    name: "key_id",
    background: true
});

// ----------------------------
// Documents of shop
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");
db.getCollection("user").createIndex({
    uid: NumberInt("1")
}, {
    name: "ukey_uid",
    background: true,
    unique: true
});
db.getCollection("user").createIndex({
    username: NumberInt("1")
}, {
    name: "ukey_username",
    background: true,
    unique: true
});

// ----------------------------
// Documents of user
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("user").insert([ {
    _id: ObjectId("60abb23f3b99dc76a66c1d1a"),
    realname: null,
    phone: null,
    email: null,
    sex: null,
    age: null,
    level: null,
    "shop_id": null,
    "shop_name": null,
    "last_login_time": null,
    openid: null,
    "is_on_duty": NumberInt("1"),
    username: "root",
    password: "$2a$10$4hgxZrnrAFOAOTYXnn2iNubE5eY/Y63XZP.Lc02SirbgLNGFmAcje",
    salt: "$2a$10$4hgxZrnrAFOAOTYXnn2iNu",
    uid: NumberInt("1"),
    "register_time": ISODate("2021-05-24T14:03:43.219Z"),
    "modify_time": ISODate("2021-05-24T14:03:43.228Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("60abb2d4d3cc0b774af803f0"),
    realname: null,
    phone: null,
    email: null,
    sex: null,
    age: null,
    level: null,
    "shop_id": null,
    "shop_name": null,
    "last_login_time": null,
    openid: null,
    "is_on_duty": NumberInt("1"),
    username: "zzc",
    password: "$2a$10$vmaorDoEfs.dh4z0KJZGT.G/iTRUb5SpU..0y6ekg7FPAG4UbuvIW",
    salt: "$2a$10$vmaorDoEfs.dh4z0KJZGT.",
    uid: NumberInt("2"),
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for user_role
// ----------------------------
db.getCollection("user_role").drop();
db.createCollection("user_role");
db.getCollection("user_role").createIndex({
    "user_id": NumberInt("1")
}, {
    name: "key_user_id",
    background: true
});
db.getCollection("user_role").createIndex({
    "role_id": NumberInt("1")
}, {
    name: "key_role_id",
    background: true
});

// ----------------------------
// Documents of user_role
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("shop");
db.getCollection("user_role").insert([ {
    _id: ObjectId("60ac4eafab7e942fb23905d1"),
    "user_id": 1,
    "role_id": 1
} ]);
db.getCollection("user_role").insert([ {
    _id: ObjectId("60ac4eb2ab7e942fb23905d2"),
    "user_id": 2,
    "role_id": 2
} ]);
session.commitTransaction(); session.endSession();
