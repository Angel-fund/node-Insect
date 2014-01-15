var fs = require('fs'),
	$ = require('jQuery'),
	db = require('./lib/db.js'),
	db = new db();

function getEontact(start,pageNum,group){
	db.sqlSelect('econtact',['name','mobi'],null,function(data){
		var contact ='';
			group = '推广'+group,
			filename = group+'.csv';

		$.each(data,function(i,item){
			contact += ',,,,'+item.name+',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'+item.mobi+',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n';
					
		})

		writeVcf(contact,filename);	
		// console.log(item.name);
	},start,pageNum)
}

//写入Csv文件
function writeCsv(data,filename){	
	options = { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'a' };//w 覆盖, a 追加
	fs.writeFile(filename, data,options, function (err) {
	  console.log("error:",err);
	});
}

function eachAllDb(pageNum){
	db.sqlSelect('econtact_back',['COUNT(*) AS count','mobi'],null,function(data){
		var count = data[0].count,//console.log(data[0].count);
			page = Math.ceil(count/pageNum),
			start = 0;
		 	while (start < page){
		        getEontact(start,pageNum,start);
		        console.log(start);
		        start ++;
		    }		
	},0,1)
}
eachAllDb(25);
// getEontact(4,100,3);
