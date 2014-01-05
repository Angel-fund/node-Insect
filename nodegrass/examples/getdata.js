var $ = require('jQuery'),
	nodegrass = require('../'),
	connection = require('./db.js');
	connection = connection.connectDb();
// console.log(connection);

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
var cid = process.argv[2],
	pageNum = process.argv[3];
function getHtml(pageid,cid){
	// var url = 'http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum='+pageid+'&pageSize=15&stdcategoryid2='+cid+'&_=1388454529278'
	var url = 'http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum='+pageid+'&pageSize=15&stdcategoryid1='+cid+'&_=1388454529278'
	nodegrass.get(url,function(data,status,headers){
	
		alibabaToDb(data);		
		return;
	},'utf-8').on('error', function(e) {
	    console.log("Got error: " + e.message);
	});
}
//阿里巴巴 规则
function alibabaToDb(data){
	var list = eval('('+data+')');

	$.each(list.data, function(index, val) {
		var companyname = val.companyname;
		//对比
		sqlSelect('enterprise',['id'],{companyname:companyname},function(data){
			// console.log(data.length);
			if (data.length) {		
				console.log('存在跳过');
			}else{
				// console.log('insert');
				insert(val);
			}
		});

		var insert = function(result){		
			if (result.companyname) {			
				var value=[];
		 		value['companyname']= result.companyname;
		 		value['companyintroduction']= result.companyintroduction;
		 		value['stdcategoryid1']= result.stdcategoryid1;
		 		value['tel']= result.tel;
		 		value['winportdomain']= result.winportdomain;
		 		value['brandlogourl']= result.brandlogourl;
		 		value['createdTime']= timestamp();

				sqlInsert('enterprise',value);
		 		console.log(result.companyname+'-'+result.tel);
			}else{
				console.log('null');
			}			
		}
		// connection.end(); 		
		//filterData(data,pageid);
	});
}


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
 		// sqlInsert('hunan_xiangtan_list',value);
 		// console.log(value);		 	
 	}); 	
 // if(a.indexOf(b)!=-1){
	// 	alert("find");
	// }
}
function listData(Data,pageid) {
	// var html = getHtml(pageid)
	var $doc = $(Data);	
 	$doc.find(".td_line a").each(function(i,project){
        var $project = $(project);
 	// 	// var name = $project.find("h3").text().trim(); 			
 		// console.log($project.text()); 		
 		var value=[];
 		value['href']= $project.attr("href");
 		value['pageid']= pageid;
 		value['createdTime']= timestamp();
 		sqlInsert('hunan_xiangtan_list',value);
 		// console.log(value);	

 	}); 		 	
}
// getHtml(2);

function listLoop(start, end){   
    while (start<end){           
        start += 1 ;
        getHtml(start,cid);
    }
}
listLoop(0,pageNum);
// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });

function  mainLoop(start, end){     
    while (start<=end){ 
        id = start
        table = 'hunan_xiangtan_list'
        url = sqlSelect(table,null,{id:start})     
        start += 1         
        if (! url){
          continue
      	}
      	console.log(url[0].href);
        // getHtml(url, id)  
	}
}
// mainLoop(1,1);
//从数据库中读取一条或多条数据的标准方法
function sqlSelect(table,fields,where,func){	
	// var fields = fields ? arr.join(',') : '*';
	// var limit = fields ? fields : '';
	if(fields){
		fields = fields.join(',');		
	}else{
		fields = '*';
	}

	if(where){
		var str = '';
	    for(key in where){
	     		str += key +'="'+where[key]+'" AND ';
				// console.log(key);
			}
		where =  str.substring(0, str.length-4)
		
	}else{
		where = '1'
	}	
	var sql = 'select '+ fields +' from '+ table+' WHERE '+ where;
	
	connection.query(sql, function(err,res,fields){
	// connection.query(sql, function(err,res){
		if(err){
			return null;
		}
		// console.log(res);
		func(res);
		// connection.end(); 
		} 
	);	
}
/*connection.query({
  sql: 'select * from enterprise where companyname =:companyname',
  params: {companyname: '汉川鑫龙祥圣服装厂'}
}, function (err, rows) {
  console.log(rows);
});*/

// sqlSelect('enterprise',['id'],{companyname:'汉川鑫龙祥圣服装厂'},function(data){
// 	console.log(data);
// })
// 向数据库插入一条或多条数据的标准方法
function sqlInsert(table,fields){
	var field='';
	var val = '';
    for(key in fields){
    	field += key+',';
    	
     	val += '"'+fields[key]+'",';
			// console.log(key);
		}
	field =  field.substring(0, field.length-1)	
	val =  val.substring(0, val.length-1)
	var sql = 'INSERT INTO '+ table +'('+ field +') VALUES('+ val+')';
	// console.log(sql);
	connection.query(sql, function(err,res,fields){
		if(err){
			return null
		}
		// console.log(res); 
		return res;
		connection.end(); 
		} 
	);	
}
// sqlInsert('pagelist',{href:'201309/demo.htm',pageid:'5',log:'demo'})

// console.log(dd);

//当前时间戳
function timestamp() { 
	var timestamp = Date.parse(new Date()); 
	return timestamp; 
} 
//return 2013-12-05 8:30
function CurentTime()
{ 
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