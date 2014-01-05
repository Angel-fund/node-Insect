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
	this.sqlSelect = function (table,fields,where,func){	
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
		var sql = 'select '+ fields +' from '+ table+' WHERE '+ where;
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
	this.sqlInsert =  function(table,fields){
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
}
