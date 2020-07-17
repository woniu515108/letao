/*
Navicat MySQL Data Transfer

Source Server         : pro_daxin
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : letao

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-07-16 15:10:49
*/
USE `letao`;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `address`
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `addressDetail` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `recipients` varchar(100) DEFAULT NULL,
  `postCode` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '1', '山西省太原市小店区', '解放东路传智播客科技集团14层1402室', '1', '周双大', '111112', null);

-- ----------------------------
-- Table structure for `brand`
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` varchar(50) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `brandLogo` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `hot` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of brand
-- ----------------------------
INSERT INTO `brand` VALUES ('1', '耐克', '1', '/mobile/images/brand1.png', '1', '1');
INSERT INTO `brand` VALUES ('2', '阿迪', '1', '/mobile/images/brand2.png', '1', '1');
INSERT INTO `brand` VALUES ('3', '新百伦', '1', '/mobile/images/brand3.png', '1', '1');
INSERT INTO `brand` VALUES ('4', '哥伦比亚', '1', '/mobile/images/brand4.png', '1', '0');
INSERT INTO `brand` VALUES ('5', '匡威', '1', '/mobile/images/brand5.png', '1', '1');
INSERT INTO `brand` VALUES ('6', '阿萨德1', '2', '/mobile/images/brand5.png', '1', '1');
INSERT INTO `brand` VALUES ('7', '阿萨德2', '2', '/mobile/images/brand5.png', '1', '1');

-- ----------------------------
-- Table structure for `cart`
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `num` int(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', '1', '1', '1', '50', '1');
INSERT INTO `cart` VALUES ('2', '1', '2', '2', '45', '1');
INSERT INTO `cart` VALUES ('3', '1', '3', '4', '40', '1');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '运动馆', '1');
INSERT INTO `category` VALUES ('2', '女士馆', '1');
INSERT INTO `category` VALUES ('3', '男士馆', '1');
INSERT INTO `category` VALUES ('4', '帆布馆', '1');
INSERT INTO `category` VALUES ('5', '户外管', '1');

-- ----------------------------
-- Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `authority` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', 'root', '4QrcOUm6Wau+VuBX8g+IPg==', '13902060052', '1');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proName` varchar(200) DEFAULT NULL COMMENT '商品名称',
  `oldPrice` float DEFAULT NULL COMMENT '商品价格',
  `price` float DEFAULT NULL COMMENT '商品折扣价',
  `proDesc` varchar(500) DEFAULT NULL COMMENT '商品描述',
  `size` varchar(20) DEFAULT NULL COMMENT '商品尺寸',
  `statu` int(4) DEFAULT NULL COMMENT '是否下架',
  `updateTime` datetime DEFAULT NULL COMMENT '上下架时间',
  `num` int(20) DEFAULT NULL COMMENT '商品库存',
  `brandId` int(11) DEFAULT NULL COMMENT '归属品牌',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '匡威三星标1970s converse复刻 142334c 144757c三星标黑色高帮', '888.1', '499.1', '描述', '40-50', '1', '2017-01-05 00:28:29', '20', '1');
INSERT INTO `product` VALUES ('2', '李宁闪击篮球鞋驭帅10镭射队尚4男韦德之道空袭中高帮队尚3.5球鞋', '888.1', '499.1', '描述', '35-45', '1', '2017-01-05 00:28:29', '20', '1');
INSERT INTO `product` VALUES ('3', 'Sport飓风 Nike Kwazi 休闲运动鞋男 844839-002-001-100-400', '888.1', '499.1', '描述', '30-50', '1', '2017-01-05 00:28:29', '20', '1');
INSERT INTO `product` VALUES ('4', '指南针运动 NIKE HYPERSHIFT篮球鞋 844392-010-607-164-017现货', '888.1', '499.1', '描述', '40-55', '1', '2017-01-05 00:28:29', '20', '1');
INSERT INTO `product` VALUES ('5', '【莹恋】MIZUNO美津浓V1GA159002乒乓球鞋男鞋女鞋室内综合训练鞋', '8868.1', '4969.1', '描述123123', '40-50', '1', '2017-01-05 00:48:05', '22', '2');
INSERT INTO `product` VALUES ('6', '【莹恋】MIZUNO美津浓V1GA159002乒乓球鞋男鞋女鞋室内综合训练鞋', '342', '112', '描述123123', '35-56', '1', '2017-01-05 00:48:05', '44', '2');

-- ----------------------------
-- Table structure for `product_picture`
-- ----------------------------
DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picName` varchar(40) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `picAddr` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_picture
-- ----------------------------
INSERT INTO `product_picture` VALUES ('1', 'product.jpg', '1', '/mobile/images/product.jpg');
INSERT INTO `product_picture` VALUES ('2', 'detail.jpg', '2', '/mobile/images/detail.jpg');
INSERT INTO `product_picture` VALUES ('3', 'detail.jpg', '3', '/mobile/images/detail.jpg');
INSERT INTO `product_picture` VALUES ('4', '/mobile/images/detail.jpg', '4', '/mobile/images/detail.jpg');
INSERT INTO `product_picture` VALUES ('5', '/mobile/images/detail.jpg', '5', '/mobile/images/detail.jpg');
INSERT INTO `product_picture` VALUES ('6', '/mobile/images/detail.jpg', '6', '/mobile/images/detail.jpg');
INSERT INTO `product_picture` VALUES ('7', '/mobile/images/detail.jpg', '1', '/mobile/images/detail.jpg');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'daxin', '4QrcOUm6Wau+VuBX8g+IPg==', '18811111111', '1');
INSERT INTO `user` VALUES ('12', '99', '4QrcOUm6Wau+VuBX8g+IPg==', '18888899999', '1');
INSERT INTO `user` VALUES ('13', 'sss', '4QrcOUm6Wau+VuBX8g+IPg==', '14444444444', '1');
INSERT INTO `user` VALUES ('14', '11', '4QrcOUm6Wau+VuBX8g+IPg==', '18844444447', '1');
INSERT INTO `user` VALUES ('15', 'yumi', '123456', '18844444447', '1');
