var fs = require('fs'),
	db = require('./lib/db.js'),	
	db = new db(),
	table = 'econtact';

function getEontact(start,pageNum,group){
	db.sqlSelect(table,['name','mobi'],null,function(data){
		var contact ='英文称谓,名,中间名,姓,中文称谓,单位,部门,职务,商务地址 街道,商务地址 街道 2,商务地址 街道 3,商务地址 市/县,商务地址 省/市/自治区,商务地址 邮政编码,商务地址 国家/地区,住宅地址 街道,住宅地址 街道 2,住宅地址 街道 3,住宅地址 市/县,住宅地址 省/市/自治区,住宅地址 邮政编码,住宅地址 国家/地区,其他地址 街道,其他地址 街道 2,其他地址 街道 3,其他地址 市/县,其他地址 省/市/自治区,其他地址 邮政编码,其他地址 国家/地区,助理的电话,商务传真,商务电话,商务电话 2,回电话,车载电话,单位主要电话,住宅传真,住宅电话,住宅电话2,ISDN,移动电话,其他传真,其他电话,寻呼机,主要电话,无绳电话,TTY/TDD 电话,电报,Internet 忙闲,办公地点,地点,电子邮件地址,电子邮件类型,电子邮件显示名称,电子邮件 2 地址,电子邮件 2 类型,电子邮件 2 显示名,电子邮件 3 地址,电子邮件3类型,电子邮件3显示名,附注,工作证号码,关键词,记帐信息,纪念日,经理姓名,类别,里程,敏感度,目录服务器,配偶,其他地址 - 邮箱,商务地址 - 邮箱,身份证编号,生日,私有,缩写,网页,性别,业余爱好,引用者,用户 1,用户 2,用户 3,用户 4,优先级,语言,帐户,职业,助理的姓名,住宅地址- 邮箱,子女\n',
			group1 = '推广'+group,
			filename = './contact/'+group1+'.csv';
	// console.log(group);
		data.forEach(function(item){	
			//360 outlook 格式
			contact += ',,,,'+item.name+',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'+item.mobi+',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n';
		});
		
		writeCsv(contact,filename);			
	},start,pageNum)
}

//写入Csv文件
function writeCsv(data,filename){	
	options = { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'a' };//w 覆盖, a 追加
	fs.writeFile(filename, data,options, function (err) {
	  if (err) {
	  	 console.log("error:",err);
	  };
	});
}

function eachAllDb(pageNum){
	db.sqlSelect(table,['COUNT(*) AS count','mobi'],null,function(data){
		var count = data[0].count,
			page = Math.ceil(count/pageNum),
			start = 0;
		 	while (start < page){
		        getEontact(start,pageNum,start);
		        console.log(start);
		        start ++;
		    }		
	},0,1)
}
//每25条记录为一个文件 
eachAllDb(1000);
// getEontact(4,100,3);
