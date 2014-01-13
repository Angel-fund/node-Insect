var fs = require('fs'),
	$ = require('jQuery'),
	db = require('./lib/db.js'),
	db = new db();

function getEontact(start,pageNum,group){
	db.sqlSelect('econtact',['name','mobi'],null,function(data){
		var contact ='';
			group = '推广'+group,
			filename = group+'.vcf';

		$.each(data,function(i,item){
			contact += 'BEGIN:VCARD\n\
VERSION:3.0\n\
N:;'+item.name+';;;\n\
FN:'+item.name+'\n\
TEL;TYPE=CELL:'+item.mobi+'\n\
CATEGORIES:'+group+'\n\
ORG:'+item.name+'\n\
X-WDJ-STARRED:0\n\
END:VCARD\n';						
		})

		writeVcf(contact,filename);	
		// console.log(item.name);
	},start,pageNum)
}

//写入vcf文件
function writeVcf(data,filename){	
	options = { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'a' };//w 覆盖, a 追加
	fs.writeFile(filename, data,options, function (err) {
	  // console.log("error:",err);
	});
}

getEontact(4,100,3);
// writeVcf(contact);