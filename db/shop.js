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

 Date: 24/05/2021 22:25:18
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
    "logo_tag": null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb60b631e6e07e92f32d4"),
    id: 2,
    "menu_name": "报表管理",
    level: 1,
    url: null,
    "logo_tag": null,
    orders: null,
    "parent_id": null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb60f631e6e07e92f32d5"),
    id: 3,
    "menu_name": "系统管理",
    level: 1,
    "logo_tag": null,
    orders: null,
    "parent_id": null,
    url: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb612631e6e07e92f32d6"),
    id: 4,
    "menu_name": "销售管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb615631e6e07e92f32d7"),
    id: 5,
    "menu_name": "厂家进货管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb619631e6e07e92f32d8"),
    id: 6,
    "menu_name": "退货管理",
    "parent_id": 1,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb61d631e6e07e92f32d9"),
    id: 7,
    "menu_name": "销售报表",
    "parent_id": 2,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb621631e6e07e92f32da"),
    id: 8,
    "menu_name": "厂家进货报表",
    "parent_id": 2,
    level: 2,
    url: null,
    "logo_tag": null,
    orders: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("60abb626631e6e07e92f32db"),
    id: 9,
    "menu_name": "退货报表",
    "parent_id": 2,
    level: 2,
    "logo_tag": null,
    orders: null,
    url: null,
    "register_time": ISODate("2021-05-24T14:06:12.284Z"),
    "modify_time": ISODate("2021-05-24T14:06:12.289Z"),
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
session.commitTransaction(); session.endSession();
