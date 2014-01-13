var cheerio = require('cheerio'),//$ = require('jQuery'),
	nodegrass = require('nodegrass'),
	db = require('./lib/db.js'),
	db = new db();
	// 
// console.log(db);

// var url= 'http://s.hc360.com/company/机床.html?e=25&v=4',
// var url= 'http://s.1688.com/company/-bbfab_4_b_2.htm?keywords=机床&pageSize=30&beginPage=2',
var url= 'http://s.hc360.com/company/机床.html?e=25&v=4',//慧聪
// var url= "http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum=6&pageSize=15&stdcategoryid1=13&_=1388454529278",
	reqheaders = { 
				"Accept":'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				"Accept-Charset":'GBK,utf-8;q=0.7,*;q=0.3',
				"Accept-Encoding":'gzip,deflate,sdch',
				"Accept-Language":'zh-CN,zh;q=0.8',
				"Connection":'keep-alive',
				"Content-Length":'1270',
				"Content-Type":'application/x-www-form-urlencoded',
				"Cookie":'Hm_lvt_f97e7df0725e35456bb11c2a4d1eb92d=1388885430; Hm_lpvt_f97e7df0725e35456bb11c2a4d1eb92d=1388925752; topmatchkey=; offerId=; corId=; sellId=; buyId=; hcsearch=2014010509302611631.03520099; visitid_time=2014-1-5%209%3A30%3A27; hc360visitid=C5FC8B368A400001785380A71D001F16; hcbrowserid=C5FC8B368A500001254F1D4016F0C030; anonymousUser=1401050930810974; user-key=C1C6EFF1201000011DE310D0F780150C; hccordet=00; hcpreurl=; contactViewCount=10; hc360analyid=C5FCB1A8EC900001D527F4106D001837; hcsearchurlport=1; hclastsearchkeyword=%u4E1C%u65B9%u6570%u63A7%u673A%u5E8A%u90E8%u4EF6%u5236%u9020%u6709%u9650%u516C%u53F8; WT_FPC=id=115.195.177.201-2679245712.30345653:lv=1388925751212:ss=1388922823702; urgeStay=7%3B3%3Bs; hckIndex=C5FC8B368AD00001EBE11BC1AB9D13A0%231%23hc360.com%232%23viewwords5%232%2331536000000',
				"Host":'s.hc360.com',
				"User-Agent":'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER'
			},
	proxy = {
		host:'116.228.55.217',
		port:'8000'
	};

//代理get
/*nodegrass.getProxy(url,function(data,status,headers){
	console.log(data);
	// console.log($);
	// var list = eval('('+data+')');
	// $.each(list.data, function(index, val) {
	// 	console.log(val.companyname);
	// });
	
},reqheaders,'gbk',proxy).on('error', function(e) {
    console.log("Got error: " + e.message);
});*/

nodegrass.get(url,function(data,status,headers){
	var $ = cheerio.load(data);
	company = $(data).find('.list_company h3 a');
	// console.log(company);
	// console.log($);
	// var list = eval('('+data+')');
	$(company).each(function(index, val) {
		console.log($(val).text());
	});
	
},'gbk').on('error', function(e) {
    console.log("Got error: " + e.message);
});
/*nodegrass.post(url,function(data,status,headers){
	console.log(headers);
	console.log(data);
	// var list = eval('('+data+')');
	// $.each(list.data, function(index, val) {
	// 	console.log(val.companyname);
	// });
	
},reqheaders,postdata,'gbk').on('error', function(e) {
    console.log("Got error: " + e.message);
});
*/