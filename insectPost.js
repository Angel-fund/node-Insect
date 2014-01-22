var cheerio = require('cheerio'),//$ = require('jQuery'),
	nodegrass = require('nodegrass');
	// db = require('./lib/db.js'),
	// db = new db();
	// 
// console.log(db);
var url= 'http://s.1688.com/company/--13.htm?pageSize=30&keywords=%BC%D2%D7%B0%A1%A2%BD%A8%B2%C4&event=1496300134&beginPage=4',
// var url= 'http://www.hnaic.gov.cn/visit/socialservice/a/listEnterpriseForAjax?nocache=1390113243885',
// var url= 'http://www.hnaic.gov.cn/visit/socialservice/a/listEntSingleForAjax?nocache=1390114015634',
// var url= 'http://shop1389113697198.1688.com',
// var url= "http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum=6&pageSize=15&stdcategoryid1=13&_=1388454529278",
	reqheaders = { 
				"Accept":'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				"Accept-Encoding":'gzip,deflate,sdch',
				"Accept-Language":'zh-CN,zh;q=0.8',
				"Cache-Control":'max-age=0',
				"Connection":'keep-alive',
				'Content-Length':'1965',
				"Content-Type":'application/x-www-form-urlencoded',
				"Cookie":'__last_loginid__=zhangfeng7205; ali_beacon_id=115.199.194.80.138784961568.115038.1; ali_apache_track="c_ms=1|c_mid=b2b-326189731|c_lid=zhangfeng7205"; ali_apache_id=122.234.238.129.1387288736500.584153.0; cna=IOxUC32/u2gCAXPO/NeqXb62; last_mid=b2b-326189731; _cn_slid_="CvurzvC%2B4l"; sync_cookie=true; lzstat_uv=13733180863198823952|2738118@2761061@3131001@2938410@3135764; h_keys="%u5bb6%u88c5%u3001%u5efa%u6750#%u5bb6%u5177#%u673a%u5e8a#%u5f00%u5173#%u5730%u677f#%u9600%u95e8#%u5bb6%u5c45"; alicnweb=touch_tb_at%3D1390062189855%7Clastlogonid%3Dzhangfeng7205; JSESSIONID=ywlFZg1-8S0RX9P9KM5O1WP6SA-1QI1VTO-LBT; _csrf_token=1390231905456; _tmp_ck_0="zmh4jzK0V3Jx50HT84PMhOhOvyP5czqWM3Tgmz7Rk%2B7BZYLY5yECrWDnqO%2BPPG127FzYB1GRi0p8GphXHHpr04JWJNgnrtgcMvKnVzFOG4H6yUsXy3BvZr9kRGtZdn6f8WtrIV3XJfmO%2BHl3xsfFGlTrmQslDaFtWYH4lslg2FqNvr2HUwq6YiHMjL225Pv%2BkV6b4kT4OhJshkVKMfJ5kMtTLtxtik4b6RPXJeW7doQQxW0Yf4p7SRJ2wYdLOkZnDDFQwIIud3q%2F9%2Biipm1szHNdyOui%2FlJ8WgA53U%2FroHwHzthv7%2FTMk75Qv6AvbV1PfW4yT6e%2Ftyb8hkSKyfpZ%2Bw%3D%3D"; ali_ab=122.234.238.129.1387282193077.8; ad_prefer="2014/01/20 23:41:18"; alisw=swIs1200%3D1%7C',
				// "Cookie":'JSESSIONID=CA07B5D2A3119034DDEC1D81429066B5; Path=/; HttpOnly',
				"Host":'http://s.1688.com',
				"Origin":'http://s.1688.com',
				"Referer":'http://s.1688.com/company/--13.htm?pageSize=30&keywords=%BC%D2%D7%B0%A1%A2%BD%A8%B2%C4&beginPage=4&event=1496300134',
				// "User-Agent":'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER'
				"User-Agent":'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
			},
	reqheaders1 = { 
		"Accept":'*/*',
		"Accept-Encoding":'gzip,deflate,sdch',
		"Accept-Language":'zh-CN,zh;q=0.8',
		"Connection":'keep-alive',
		"Content-Length":"31",
		"Content-Type":'application/x-www-form-urlencoded',
		"Cookie":'JSESSIONID=A69C963ED165863ACC8EBA95633A2976',
		"Host":'www.hnaic.gov.cn',
		"Origin":'http://www.hnaic.gov.cn',
		"Referer":'http://www.hnaic.gov.cn/visit/socialservice/a/listEnterprise?marktype=1',
		"User-Agent":'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER'
	},
	proxy = {
		host:'116.228.55.217',
		port:'8000'
	},
	postdata1 = {
		markid:'430000000011981012500011'		
	},
	postdata = {
		pageSize:'30',
		event:'1496300134',
		keywords:'%BC%D2%D7%B0%A1%A2%BD%A8%B2%C4',
		beginPage:'4'
	};

nodegrass.post(url,function(data,status,headers){
	console.log(status);
	// console.log(headers);
	// console.log(data);	
},reqheaders,postdata,'gbk').on('error', function(e) {
    console.log("Got error: " + e.message);
});
/*nodegrass.get(url,function(data,status,headers){
	var $ = cheerio.load(data);
	// company = $(data).find('.list_company h3 a');
	console.log(headers);
	console.log(data);
	// var list = eval('('+data+')');
	// $(company).each(function(index, val) {
	// 	console.log($(val).text());
	// });
	
},reqheaders,'gbk').on('error', function(e) {
    console.log("Got error: " + e.message);
});*/

/*nodegrass.get('http://rarbg.com/download.php?id=279twq1&f=Hot%20Amateur%20Teen%20Couple-Hard%20Fuck%20in%20the%20Bathroom-[rarbg.com].torrent',function(data,status,headers){
	var $ = cheerio.load(data);
	// company = $(data).find('.list_company h3 a');
	console.log(headers);
	console.log(data);
	// var list = eval('('+data+')');
	// $(company).each(function(index, val) {
	// 	console.log($(val).text());
	// });
	
},reqheaders,'gbk').on('error', function(e) {
    console.log("Got error: " + e.message);
});
*/
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
