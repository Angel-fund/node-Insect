node-Insect
===========

##nodejs爬虫
主要业务抓取阿里巴巴，慧聪网的企业信息
##使用
    node getdata.js 页数 行业id

##行业id对照表  
    家居建材= 13:建材, 58:照明工业, 59:五金工具 ,18:户外运动 ,7:数码、电脑 ,96:家纺  
    312:内衣, 
    食品农业= 2:食品、饮料
    日用百货= 15:日用百货, 17:工艺品、礼品 71:汽摩及配件,67:办公、文教
    橡塑橡胶= 55:橡塑
    冶金钢材= 9:冶金矿产
    化工精细= 56:精细化学品,8:化工
    纺织= 4:纺织、皮革
    包装= 52:纸业 68:包装
    五金机械= 65:机械及行业设备, 72:印刷 ,64:环保 ,12:交通运输
    电子电工= 5:电工电气 57:电子元器件 58
    照明安防= 10208:仪器仪表,70:安全、防护
    医药医疗= 66:医药、保养
    stdcategoryid2 10165:男装 ,10166:女装,1043574:,
    美妆日化= 1043574:日化用品,1043171:美容、化妆用具 ,1043162:美甲用品,1042634:护肤品 ,82101:彩妆、香水 ,10313:美发造型
    1042954:箱包皮具, 1038378:鞋 , 54:服饰配件、饰品 6:家用电器,509:通信产品 ,53:传媒、广电,1813:玩具,1501:母婴用品,311:童装

**表结构**
>>企业信息表 enterprise
    CREATE TABLE `enterprise` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `companyname` varchar(64) NOT NULL COMMENT '企业名',
    `companyintroduction` text COMMENT '企业描述',
     `businessAddress` varchar(255) DEFAULT NULL COMMENT '经营地址',
     `legalPerson` varchar(10) DEFAULT NULL COMMENT '法定代表人',
     `turnover` varchar(32) DEFAULT NULL COMMENT '年营业额',
     `nature` varchar(62) DEFAULT NULL COMMENT '企业性质',
    `source` enum('1688','hc360') NOT NULL COMMENT '采集来源',
    `founded` varchar(16) DEFAULT NULL COMMENT '公司成立时间',
    `registeredCapital` int(11) DEFAULT NULL COMMENT '注册资本',
    `mainProducts` text COMMENT '主营产品',
    `stdcategoryid1` int(8) DEFAULT NULL COMMENT '行业类别',
    `tel` varchar(20) DEFAULT NULL COMMENT '联系方式',
    `contact` varchar(10) DEFAULT NULL COMMENT '联系人',
    `winportdomain` varchar(255) DEFAULT NULL COMMENT '阿里二级域名',
    `brandlogourl` varchar(255) DEFAULT NULL COMMENT '广告图片',
    `createdTime` int(13) NOT NULL,
     PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=8389 DEFAULT CHARSET=utf8


>>企业联系信息表
    CREATE TABLE `econtact` (
     `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `cid` int(10) DEFAULT '0',
      `name` varchar(64) NOT NULL COMMENT '企业名',
     `mobi` varchar(20) DEFAULT NULL COMMENT '联系方式',
     PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7880 DEFAULT CHARSET=utf8

>>请求报错log表
    CREATE TABLE `errorurl` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
     `url` varchar(500) NOT NULL,
     `type` enum('list','detail') NOT NULL COMMENT '列表页、详情页',
     `source` enum('1688','hc360') NOT NULL,
     PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='请求错误url'

>>行业类别表（根据阿里巴巴行业id对应）
    CREATE TABLE `category` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `category` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
     `parent` int(11) NOT NULL DEFAULT '0',
     PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8

