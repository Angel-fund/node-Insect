var mysql = require("mysql");
module.exports = function(){
	//this.connectDb = function () {	
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : ''
		  // pdatabase: 'contact'
		});
		connection.connect();
		var TEST_DATABASE = 'contact';
		connection.query('USE '+TEST_DATABASE);
	//	return connection;
	//}
	
	//从数据库中读取一条或多条数据的标准方法
	/*
	@ current 当前页数
	@ pageNum 每页显示数
	*/
	this.escape = mysql.escape;
	this.sqlSelect = function (table,fields,where,func,current,pageNum){	
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
				}
			where =  str.substring(0, str.length-4)
			
		}else{
			where = '1'
		}
		var offset = current*pageNum;
		var sql = 'SELECT '+ fields +' FROM '+ table+' WHERE '+ where + ' LIMIT '+ offset +','+pageNum;
		
		// var connection = this.connectDb;
		connection.query(sql, function(err,res,fields){	
			if(err){
				return null;
			}

			func(res);		
		});	
	}
	// 删除一条或多条数据的标准方法
	this.sqlDelete =  function(table,where,func){
		if(typeof(where) == 'object'){
			var str = '';
		    for(key in where){
		     		str += key +'="'+where[key]+'" AND ';			
				}
			where =  str.substring(0, str.length-4)
			
		}else if(typeof(where) == 'string'){
			where = where;
		}else{
			where = '1';
		}

		var sql = 'DELETE FROM '+ table+' WHERE '+ where;
		// console.log(sql);
		// var connection = this.connectDb;
		connection.query(sql, function(err,res,fields){	
				if(err){
					return null;
				}

				func(res);		
			} 
		);
	}
	// 向数据库插入一条或多条数据的标准方法
	this.sqlInsert =  function(table,fields,func){
		/*var field='';
		var val = '';
	    for(key in fields){
	    	field += key+',';
	    	var fieldVal = String(fields[key]),
	    	fieldVal = (fieldVal)? connection.escape(fieldVal.trim()) : null;
	     	val += '"'+fieldVal+'",';	     	
     		// console.log(fieldVal);	     				
		}
		field =  field.substring(0, field.length-1)	
		val =  val.substring(0, val.length-1)
		var sql = 'INSERT INTO '+ table +'('+ field +') VALUES('+ val+')';*/
		var sql = 'INSERT INTO '+ table +' SET ?';
	
		var query = connection.query(sql, fields,function(err,res){
			if(err){ 
				console.log('插入出错',err);
				return;
			}
			func(res);
			// console.log(res);
			// connection.end(); 
		});
		// query.on('end', function() {
	 //    	console.log(query.sql);
	 //  	});		
	}
}
