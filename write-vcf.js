var fs = require('fs'),
	db = require('./lib/db.js'),
	db = new db();

function getErrorDb(start,pageNum){
	db.sqlSelect('errorurl',['id','url'],null,function(data){
		// $.each(data,function(i,item){
			console.log(data);			
			// hcCompany(item.url);
		// })
	},start,pageNum)
}
//getErrorDb(0,10);
//var contact = '';
/*$.each(data,function(i,item){
			contact += 'BEGIN:VCARD\n\
						VERSION:3.0\n
						N:;北京向宏达科贸有限责任公司;;;\n\
						FN:北京向宏达科贸有限责任公司\n\
						TEL;TYPE=CELL:13000101847\n\
						CATEGORIES:推广0\n\
						ORG:北京向宏达科贸有限责任公司\n\
						X-WDJ-STARRED:0\n\
						END:VCARD\n'
			item.mobi	
			// hcCompany(item.url);
		})*/
// db.sqlSelect('errorurl',['id'],null,function(data){
// 		// console.log(data.length);				
// 		console.log(data);
		
// 	},0,10);

//写入vcf文件
function writeVcf(data){	
	options = { encoding: 'utf8', mode: 438 /*=0666*/, flag: 'a' };//w 覆盖, a 追加
	fs.writeFile('message.vcf', data,options, function (err) {
	  console.log("It's saved and the server remains responsive!");
	});
}
var contact = 'BEGIN:VCARD\n\
VERSION:3.0\n\
N:;北京向宏达科贸有限责任公司;;;\n\
FN:北京向宏达科贸有限责任公司\n\
TEL;TYPE=CELL:13000101847\n\
CATEGORIES:推广0\n\
ORG:北京向宏达科贸有限责任公司\n\
X-WDJ-STARRED:0\n\
END:VCARD\n';
writeVcf(contact);