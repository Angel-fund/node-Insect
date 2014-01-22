var cheerio = require('cheerio'),//$ = require('jQuery'),
	nodegrass = require('nodegrass');
	/*db = require('./lib/db.js'),
	db = new db();*/
	// 
// console.log(db);

// var url= 'http://s.hc360.com/company/机床.html?e=25&v=4',
// var url= 'http://s.1688.com/company/-bbfab_4_b_2.htm?keywords=机床&pageSize=30&beginPage=2',
var url= 'http://www.woisoso.cn/trade/5306/p/679/',//慧聪
// var url= "http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum=6&pageSize=15&stdcategoryid1=13&_=1388454529278",
	reqheaders = { 
				"Accept":'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				"Accept-Charset":'GBK,utf-8;q=0.7,*;q=0.3',
				// "Accept-Encoding":'gzip,deflate,sdch',
				"Accept-Language":'zh-CN,zh;q=0.8',
				"Connection":'keep-alive',
				"Cookie":'bdshare_firstime=1388996355803; PHPSESSID=sqn2dce7enlp4itavbctisevs4; visit_82=82; visit_62390=62390; Hm_lvt_0f570500b04da7b6757bd6da0c378e48=1388996356,1390199935; Hm_lpvt_0f570500b04da7b6757bd6da0c378e48=1390200179; Hm_t=1',
				"Host":'www.woisoso.cn',
				// "If-Modified-Since":'Tue, 10 Dec 2013 14:59:33 GMT',
				"Referer":'http://www.woisoso.cn/trade/5306/',
				"User-Agent":'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
				// "User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER'
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
	console.log(data);
	/*company = $(data).find('.list_company h3 a');	
	$(company).each(function(index, val) {
		console.log($(val).text());
	});*/
	
},reqheaders,'utf8').on('error', function(e) {
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