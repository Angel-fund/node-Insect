var $ = require('jQuery');
var nodegrass = require('../');
<<<<<<< HEAD
nodegrass.get("http://daili.1688.com/daili/ajax.json?action=list/list_action&event_submit_doQueryFromList=true&pageNum=6&pageSize=15&stdcategoryid1=13&_=1388454529278",function(data,status,headers){
	// console.log(status);
	// console.log($);
	var list = eval('('+data+')');
	$.each(list.data, function(index, val) {
		console.log(val.companyname);
	});
	
},'utf-8').on('error', function(e) {
=======
nodegrass.get("https://github.com",function(data,status,headers){
	console.log(status);
	console.log(headers);
	console.log(data);
},null,'utf8').on('error', function(e) {
>>>>>>> 8bfc2e545cc3427172a0a5be0af6f3e073eb17c4
    console.log("Got error: " + e.message);
});