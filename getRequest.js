var $ = require('jQuery'),
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
				"Accept-Encoding":'gzip,deflate,sdch',
				"Accept-Language":'zh-CN,zh;q=0.8',
				"Cache-Control":'max-age=0',
				"Connection":'keep-alive',
				"Content-Length":'1270',
				"Content-Type":'application/x-www-form-urlencoded',
				"Cookie":'JSESSIONID=ZwlFGg1-5DrQRQYi2v09QXvFvA-b2ZrxRO-9Gl6; ali_beacon_id=115.199.194.80.138784961568.115038.1; ali_apache_id=122.234.238.129.1387288736500.584153.0; sync_cookie=true; ali_apache_track="c_ms=1|c_mid=b2b-326189731|c_lid=zhangfeng7205"; ali_apache_tracktmp="c_w_signed=Y"; cna=h14tC9GL+VsCAXPHwo+WNee4; __rn_refer_login_id__=zhangfeng7205; __rn_alert__=false; _ITBU_IS_FIRST_VISITED_=wujiachun2011%3Apm08740d6g; lzstat_uv=13733180863198823952|2738118@2761061; lzstat_ss=1696521785_1_1388862821_2738118|2242057894_0_1388862847_2761061; __cn_logon__=true; __cn_logon_id__=zhangfeng7205; userID="1VSKZEfoQQ8ruAwioeaDbOgJ6Jqzad9RZAubUyjhD286sOlEpJKl9g%3D%3D"; LoginUmid="KBECVbvALSFlm7rSJTjua86scVsLvamRLG4Xl9dMW9rmkdAiNY8Cqw%3D%3D"; cn_tmp="Z28mC+GqtZ2ouuRtuM8oTwMaQdBuE1eHjbUN7q6Hkf2gk8hg5ilQJInSUYqc+0X3uxa39a86nR+9WsR4w7JGoY8TT2uv/RnbdbK565CkjPMyifpH3JkBGPThkKnwQHS7lekA8xOgrVL+7YxYJavwe/499z57zj3bvkVo9QAzHf/vW/uN0uiiNJBSdi7TTY9XYfAKxe5nPWKE6D03jjHBEjQ3alBotID4mYB4nY3/+Xrw53PkrRBlNQ=="; last_mid=b2b-326189731; _cn_slid_="CvurzvC%2B4l"; __last_loginid__=zhangfeng7205; login="kFeyVBJLQQI%3D"; _csrf_token=1388834068007; alicnweb=touch_tb_at%3D1388832112813%7Clastlogonid%3Dzhangfeng7205; ali_ab=122.234.238.129.1387282193077.8; ad_prefer="2014/01/04 19:15:14"; h_keys="%u673a%u5e8a#%u5bb6%u5177#%u5f00%u5173#%u5730%u677f#%u9600%u95e8#%u5bb6%u5c45"; alisw=swIs1200%3D1%7C; userIDNum="9B5tY%2B3gVEZTAhztWl1ziA%3D%3D"; _nk_="TJ1ho1mmDr6lhbyoBxJTtA%3D%3D"; _tmp_ck_0="uS3J%2FTASuVfFiDPMj3TC1egB6bCRoozF%2BqHnPEUUO4Z5WPGG65PxMyw7UJ7QWeNGMB5bqYMpIQDzHQGKhTQKN4eWRjYEdvvLEPEzs85rjap%2BAPL7AUng9SznWuRekyukVvhz7IKWXqa6NiZSWIjs687r5p%2BChEyeD1ID%2Fgc%2Bc9O9YfgUxphwqiRNTAPlHkWoeuNudGo1dfwBvPuBSrxB4dDT8zwvDLpAWx11ZwLxx%2B3tckh23Hy0eyBraUd74mmNP1xk3%2FU7dOFgHT3oRXMs9RK%2FT1bqVej4tWDBBeN1BjF4bviTgEC5h1egmNEYxKukCTC%2F0VnFSeKd6Xlcuvf4cbOFGiXU%2FUnTCbZugEOSRQwWbAZZJi%2FBq%2BOcVJIjk%2Fa9C%2FfegCQSukWVoRq9zvcCiMvgXybuYpKjWwzPH7DoNOPja1QB8phQCmdhoorT0%2BQwpJGoNS8bC0NuGwKSpoNVjH17%2Bnbsb9SqQ6V7tc5c%2Be82tBbKG%2B3%2Bfp8AU%2F7cIBGcYlcBnpDMZU6s7pIogJKi%2BA%3D%3D',
				"Host":'s.1688.com',
				"Origin":'http://s.1688.com',
				"Referer":'http://s.1688.com/company/-bbfab_4_b_2.htm?keywords=%BB%FA%B4%B2&pageSize=30&beginPage=2',
				"User-Agent":'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36 LBBROWSER'
			},
	postdata = {
		pageSize:'30',
		keywords:'机床',
		beginPage:'2'
	};
nodegrass.get(url,function(data,status,headers){
	console.log(data);
	// console.log($);
	// var list = eval('('+data+')');
	// $.each(list.data, function(index, val) {
	// 	console.log(val.companyname);
	// });
	
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