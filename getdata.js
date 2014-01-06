var $ = require('jQuery'),
	nodegrass = require('nodegrass'),
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
		url	= 'http://s.hc360.com/company/机床.html?e='+page+'&v=4',//慧聪
		source = '1688';
	// var url = 'http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum='+pageid+'&pageSize=15&stdcategoryid1='+cid+'&_=1388454529278'
	nodegrass.get(url,function(data,status,headers){	
		// alibabaToDb(data);		//阿里巴巴
		hc360ToDb(data);		//慧聪			
		return;
	},'gbk').on('error', function(e) {
		//记录列表错误url
		var error = [];
			error['url'] = url;
			error['type'] = 'list';
			error['source'] = source;

		db.sqlInsert('errorur',error);
	    console.log("Got error: " + e.message);
	});
}
//阿里巴巴 代理栏目 规则
function alibabaToDb(data){
	var list = eval('('+data+')');

	$.each(list.data, function(index, val) {
		var companyname = val.companyname;
		//入库排重
		matchDb(companyname,function(){
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

		/*var insert = function(result){		
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
		}*/
		// connection.end(); 		
		//filterData(data,pageid);
	});
}
//慧聪 企业栏目 规则======================================
function hc360ToDb(data){
	var $html = $(data),
		company = $html.find('.list_company h3 a');		
		$.each(company,function(i,item){
			var href = $(item).attr('href');
				// companyname = $.trim($(item).text());
				href = href+'shop/show.html';
			// console.log(companyname);

			hcCompany(href);			
		});
		process.nextTick(function() {
		  console.log('=====完成====');
		});		
}

//慧聪企业详情 
function hcCompany(href){
	var url = href;	
	nodegrass.get(url,function(data,status,headers){
			var $html = $(data),
				companyname	= $.trim($html.find('.comName a').text());
				console.log(companyname);
			if (companyname) {	
				//入库排重
				matchDb(companyname,function(){				
						// var $html = $(data),
						var tableTr = $html.find('.detailsinfo table tr'),
							contactbox = $html.find('.contactbox'),
							cAbout = $html.find('.cAbout'),
							telstr = $(contactbox).find("ul li[title^='手机']").text();

						if (!telstr) {
							telstr = $(contactbox).find("ul li[title^='电话']").text();	
							telstr = telstr.split('   ')[0];
						}
						var tel = telstr.split('：')[1],
							nature = $(tableTr).eq(0).find('td').eq(3).text(),				
							values = [];

						values['companyname'] = companyname;
						// values['companyintroduction'] = $(cAbout).html()					 
						values['companyintroduction'] = $.trim($(cAbout).text());
						values['mainProducts'] = $.trim($(tableTr).eq(0).find('td').eq(1).text());
						values['nature'] = $.trim($(tableTr).eq(1).find('td').eq(1).text());
						values['businessAddress'] = $.trim($(tableTr).eq(2).find('td').eq(3).text());
						values['legalPerson'] = $.trim($(tableTr).eq(3).find('td').eq(3).text());
						values['turnover'] = $.trim($(tableTr).eq(4).find('td').eq(3).text());
						
						values['source'] = '1688';
						values['founded'] = $.trim($(tableTr).eq(3).find('td').eq(3).text());
						values['registeredCapital'] = $.trim($(tableTr).eq(5).find('td').eq(3).text());
						
						values['stdcategoryid1'] = 65;
						values['tel'] = $.trim(tel);
						values['contact'] = $.trim($html.find('.renName').text());
						values['winportdomain'] = href;
						var brandlogourl = $(cAbout).find('.cAboutPic #hc_jiaodianmain img').attr('src');
						values['brandlogourl'] = (brandlogourl != undefined) ? brandlogourl : null;
						values['createdTime'] = timestamp();

						db.sqlInsert('enterprise',values);
			 			// console.log(companyname);					
				})
			}else{
				console.log('企业名null,排除');
			}
			// console.log(values);
		// console.log($(table).find('tr[0] td[3]').text());		//基本信息
		
		return;
	},'gbk').on('error', function(e) {
		//记录详情页错误url		
		var error = [];
			error['url'] = url;
			error['type'] = 'detail';
			error['source'] = 'hc360';

		db.sqlInsert('errorurl',error);
	    console.log("Got error: " + e.message);
	});
}
//比对
function matchDb(companyname,callback){
	db.sqlSelect('enterprise',['id'],{companyname:companyname},function(data){
		// console.log(data.length);
		if (data.length) {		
			console.log('存在跳过');
		}else{				
			callback();
		}
	},0,1);
}

// hcCompany('http://kaimafujian.b2b.hc360.com/shop/show.html');
// hcCompany('http://yhret2012.b2b.hc360.com/','江苏南元机床集团有限公司');
// getHtml(0,1);

function pageData(Data,pageid) {
	var $doc = $(Data);	
	// console.log(Data);
 	$doc.find(".detail_content p").each(function(i,project){
        var $project = $(project);
 	// 	// var name = $project.find("h3").text().trim(); 			
 		console.log($project.text()); 		
 		// var value=[];
 		// value['href']= $project.attr("href");
 		// value['pageid']= pageid;
 		// value['createdTime']= CurentTime();
 		// db.sqlInsert('hunan_xiangtan_list',value);
 		// console.log(value);		 	
 	}); 	
 // if(a.indexOf(b)!=-1){
	// 	alert("find");
	// }
}


// getHtml(2);
function listLoop(start, end){  		
    while (start < end){        
        getHtml(start,65);
        start ++;
    }     
}
listLoop(start,end);
//删除数据
/*db.sqlDelete('errorurl',{id:2680},function(data){
	console.log(data);
})*/

//3360 120 28页
function getErrorDb(start,pageNum){
	db.sqlSelect('errorurl',['id','url'],null,function(data){
		$.each(data,function(i,item){
			console.log(item.url);			
			hcCompany(item.url);
		})
	},start,pageNum)
}
// getErrorDb(0,12);
// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });


// sqlSelect('enterprise',['id'],{companyname:'汉川鑫龙祥圣服装厂'},function(data){
// 	console.log(data);
// })

// sqlInsert('pagelist',{href:'201309/demo.htm',pageid:'5',log:'demo'})

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
//  $.get("https://github.com/popular/forked",function(html){

//  	var $doc = $(html);
//     console.log("No.  name  language  star   forks  ")
//  	$doc.find("ul.repolist li.source").each(function(i,project){

//         var $project = $(project);
//  		var name = $project.find("h3").text().trim();
//  		var language = $project.find("li:eq(0)").text().trim();
//  		var star = $project.find("li.stargazers").text().trim();
//  		var forks = $project.find("li.forks").text().trim();
//  		var row =String.format("{4} {0}  {1}  {2}  {3}",name,
//  			language,star,forks,i + 1 );
 		
//  		console.log(row);
//  	});
//  });