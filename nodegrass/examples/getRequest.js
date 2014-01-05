var $ = require('jQuery');
var nodegrass = require('../');
nodegrass.get("http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum=6&pageSize=15&stdcategoryid1=13&_=1388454529278",function(data,status,headers){
	// console.log(status);
	// console.log($);
	var list = eval('('+data+')');
	$.each(list.data, function(index, val) {
		console.log(val.companyname);
	});
	
},'utf-8').on('error', function(e) {
    console.log("Got error: " + e.message);
});