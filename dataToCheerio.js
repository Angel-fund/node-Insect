var cheerio = require('cheerio'),//$ = require('jQuery'),
	nodegrass = require('nodegrass'),
	async = require('async'),	
	db = require('./lib/db.js'),	
	db = new db();

/* 7完毕
*parms stdcategoryid1 家居建材= 13:建材, 58:照明工业, 59:五金工具 ,18:户外运动 ,7:数码、电脑 ,96:家纺  
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

*/
/*var cid = process.argv[2],
	start = process.argv[3],
	end = process.argv[4];*/
var start = parseInt(process.argv[2]),
	end = parseInt(process.argv[3]);

function getHtml(pageid,cid){
	var page = pageid*24+1,
		url	= 'http://s.hc360.com/company/机械市场.html?e='+page+'&v=4',//慧聪
		source = 'hc360';
	// var url = 'http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum='+pageid+'&pageSize=15&stdcategoryid1='+cid+'&_=1388454529278'
	nodegrass.get(url,function(data,status,headers){	
		// alibabaToDb(data);		//阿里巴巴
		hc360ToDb(data,cid);		//慧聪			
		return;
	},'gbk').on('error', function(e) {
		//记录列表错误url
		var error = [];
			error['url'] = url;
			error['type'] = 'list';
			error['cid'] = cid;
			error['source'] = source;

		matchDb('errorurl',{url:url},function(type){
			if(type){
				console.log('存在跳过');
			}else{
				db.sqlInsert('errorurl',error);
			}
		})
	    console.log("Got error: " + e.message);
	});
}
//阿里巴巴 代理栏目 规则
/*function alibabaToDb(data){
	var list = eval('('+data+')');

	$.each(list.data, function(index, val) {
		var companyname = val.companyname;
		//入库排重	
		matchDb('enterprise',{companyname:companyname},function(){
			if (companyname) {			
				var values=[];
		 		values['companyname']= val.companyname;
		 		values['companyintroduction']= val.companyintroduction;
		 		values['stdcategoryid1']= val.stdcategoryid1;
		 		values['tel']= val.tel;
		 		values['winportdomain']= val.winportdomain;
		 		values['brandlogourl']= val.brandlogourl;
		 		values['createdTime']= timestamp();

				// db.sqlInsert('enterprise',values);
		 		console.log(result.companyname+'-'+result.tel);
			}else{
				console.log('null');
			}			
		})
		//比对
		// db.sqlSelect('enterprise',['id'],{companyname:companyname},function(data){
		// 	// console.log(data.length);
		// 	if (data.length) {		
		// 		console.log('存在跳过');
		// 	}else{				
		// 		insert(val);
		// 	}
		// });

		var insert = function(result){		
			if (result.companyname) {			
				var values=[];
		 		values['companyname']= result.companyname;
		 		values['companyintroduction']= result.companyintroduction;
		 		values['stdcategoryid1']= result.stdcategoryid1;
		 		values['tel']= result.tel;
		 		values['winportdomain']= result.winportdomain;
		 		values['brandlogourl']= result.brandlogourl;
		 		values['createdTime']= timestamp();

				// db.sqlInsert('enterprise',values);
		 		console.log(result.companyname+'-'+result.tel);
			}else{
				console.log('null');
			}			
		}
		// connection.end(); 		
		//filterData(data,pageid);
	});
}*/
//慧聪 企业栏目 规则======================================
function hc360ToDb(data,cid){
	var $ = cheerio.load(data),
	// var $html = $(data),
		company = $(data).find('.list_company h3 a');		
		$(company).each(function(i,item){
			var href = $(item).attr('href'),				
				href = href+'shop/show.html';

			hcCompany(href,cid,function(){
				console.log(companyname);
			});			
		});
	/*	async.auto({
			getpage:function(callback){
						$(company).each(function(i,item){
							var href = $(item).attr('href');				
								href = href+'shop/show.html';				
							hcCompany(href);
						}							
					},
			result:['getpage',function(callback, results){
				console.log('=====完成====');
			}]
		},function(err, results) {
		    log('1.1: err: ', err);
		    log('1.1: results: ', results);
		});*/
		process.nextTick(function() {
		  console.log('=====进入页====');
		});		
}

//慧聪企业详情 
function hcCompany(url,cid,func){	
	nodegrass.get(url,function(data,status,headers){
			var $ = cheerio.load(data),//$html = $(data),
				companyname	= $(data).find('.comName a').text().trim();
				
			if (companyname) {	
				//入库排重				
				matchDb('enterprise',{companyname:companyname},function(type){				
					if(type){
						console.log('存在跳过');
						func();
					}else{
						var tableTr = $(data).find('.detailsinfo table tr'),
							contactbox = $(data).find('.contactbox'),
							cAbout = $(data).find('.cAbout'),
							telstr = $(contactbox).find("ul li[title^='手机']").text();

						if (!telstr) {
							telstr = $(contactbox).find("ul li[title^='电话']").text();	
							telstr = telstr.split('   ')[0];
						}
						var tel = telstr.split('：')[1],
							nature = $(tableTr).eq(0).find('td').eq(3).text(),	
							values = {};						
					
						var brandlogourl = $(cAbout).find('.cAboutPic #hc_jiaodianmain img').attr('src');
						
						values.companyname = companyname;
						values.companyintroduction = $(cAbout).text();//db.escape(
						values.mainProducts = $(tableTr).eq(0).find('td').eq(1).text();
						values.nature = $(tableTr).eq(1).find('td').eq(1).text();
						values.businessAddress = $(tableTr).eq(2).find('td').eq(3).text().trim();
						values.legalPerson = $(tableTr).eq(3).find('td').eq(3).text().trim();
						values.turnover = $(tableTr).eq(4).find('td').eq(3).text();
						values.source = 'hc360';
						values.founded = $(tableTr).eq(3).find('td').eq(1).text().trim();
						values.registeredCapital = $(tableTr).eq(5).find('td').eq(3).text();
						values.stdcategoryid1 = cid;
						values.tel = (tel) ? tel.trim() : null;
						values.contact = ($(data).find('.renName').text()) ? $(data).find('.renName').text().trim() : null;
						values.winportdomain = url;						
						values.brandlogourl = (brandlogourl != undefined) ? brandlogourl : null;
						values.createdTime = timestamp();
	
						if(values.founded == '—' && values.legalPerson == '—' && values.businessAddress == '—'){
							console.log('垃圾数据',url);
						}else{
							db.sqlInsert('enterprise',values,function(){								
								func();
							});
													
						}		
					}							
				})
			}else{
				func();
				console.log('企业名'+companyname+',排除'+url);
			}

		return;
	},'gbk').on('error', function(e) {
		//记录详情页错误url		
		var error = [];
			error['url'] = url;
			error['type'] = 'detail';
			error['cid'] = cid;
			error['source'] = 'hc360';

		matchDb('errorurl',{url:url},function(type){
			if(type){
				console.log('存在跳过');
			}else{
				db.sqlInsert('errorurl',error);
			}
		})
		
	    console.log("Got error: " + e.message);
	});
}
//比对
function matchDb(table,where,callback){	
	db.sqlSelect(table,['id'],where,function(data){		
		if (data.length) {			
			callback(true);
		}else{				
			callback(false);
		}
	},0,1);
}

// hcCompany('http://kaimafujian.b2b.hc360.com/shop/show.html');
// hcCompany('http://yhret2012.b2b.hc360.com/','江苏南元机床集团有限公司');
// getHtml(0,1);

// getHtml(2);
function listLoop(start, end){  		
    while (start < end){        
        getHtml(start,65);
        start ++;
    }     
}
// var san = end+5;
// listLoop(start,end);
//并行执行 310页
// async.parallel([
//     function() { listLoop(start,end) },
//     function() { listLoop(end,san) }  
// ], function (err, results) {
//     log('1.1 err: ', err);
//     log('1.1 results: ', results);
// });
//删除数据
/*db.sqlDelete('errorurl',{id:2680},function(data){
	console.log(data);
})*/

//读取错误日志 将错误链接重新抓取插入企业表，并删除该错误链接
function getErrorDb(start,pageNum){
	db.sqlSelect('errorurl',['id','cid','url'],null,function(data){
		data.forEach(function(item){
			hcCompany(item.url,item.cid,function(){
				db.sqlDelete('errorurl',{id:item.id},function(data){
					console.log('删除',item.id);
				})
			});
		})		
	},start,pageNum);
}
getErrorDb(0,1000);

// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });


// sqlSelect('enterprise',['id'],{companyname:'汉川鑫龙祥圣服装厂'},function(data){
// 	console.log(data);
// })

//当前时间戳
function timestamp() { 
	var timestamp = Date.parse(new Date()); 
	return timestamp; 
} 
//return 2013-12-05 8:30
function CurentTime(){ 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";       
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
}