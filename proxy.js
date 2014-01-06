var ng = require('nodegrass'),
	 http=require('http'),
	 url=require('url');

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;

	if(pathname === '/'){
		ng.get('http://s.hc360.com/company/机床.html?e=25&v=4',function(data){
			res.writeHeader(200,{'Content-Type':'text/html;charset=gbk'});
			res.write(data+"\n");
	console.log(data);
			res.end();
			},null,'gbk');
		}
	}).listen(8088);


/*
var http = require('http'),
	http = require('http'),
	net = require('net'),
	url = require('url');

// Create an HTTP tunneling proxy
var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});
proxy.on('connect', function(req, cltSocket, head) {
  // connect to an origin server
  var srvUrl = url.parse('http://' + req.url);
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});

// now that proxy is running
proxy.listen(1337, '127.0.0.1', function() {

  // make a request to a tunneling proxy
  var options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'http://www.youtube.com/'
  };

  var req = http.request(options);
  req.end();

  req.on('connect', function(res, socket, head) {
    console.log('got connected!');

    // make a request over an HTTP tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'http://www.youtube.com/\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', function(chunk) {
      console.log(chunk.toString());
    });
    socket.on('end', function() {
      proxy.close();
    });
  });
});*/