var nodegrass = require('nodegrass'),
	baidu = require('./lib/baidu-frontia.js'),
// url = 'http://rarbg.com/download.php?id=279twq1&f=Hot%20Amateur%20Teen%20Couple-Hard%20Fuck%20in%20the%20Bathroom-[rarbg.com].torrent',
url = 'http://dyncdn.me/static/over/8bf0c050624609d124f066daa1d68e721711a969.jpg',
filename = 'test.torrent';
/*nodegrass.getFile(url,filename,function(e){
	if(e){
		console.log(e);
	}
	console.log('download success!');
});*/
/*nodegrass.download_file_curl(url,'./contact/',function(e){
	if(e){
		console.log(e);
	}
	console.log('download success!');
});*/
var personalStorage = baidu.frontia.personalStorage,
	options = {
        // 当存在同名文件时，覆盖
        ondup: personalStorage.constant.ONDUP_OVERWRITE,

        // 上传成功
        success: function (response) {
          console.log(response);

          // 根据 路径和文件名 查找该文件的下载地址
          personalStorage.getFileUrl(filename, {
            success: function (response) {
              // var url = response || '';
              // if (!file.type.match(/image.*/)) {
              //   msgEl.innerHTML = '<p>上传的文件路径是<br><pre><code>' + url + '</code></pre></p>';
              // } else {
              //   var img = document.createElement('img');
              //   img.src = url;
              //   msgEl.appendChild(img);
              // }
            },
            error: function () {
              console.log(arguments);
            }
          })
        },

        // 出错了 Orz
        error: function (err) {
          console.log(err);
          // msgEl.innerHTML = err.toString();
        }
      };
 var file = './contact/8bf0c050624609d124f066daa1d68e721711a969.jpg',
      PCSroot = '/apps/yunfile',
      filename = PCSroot + '/' + 'test.jpg';

baidu.frontia.personalStorage.uploadFile(file, filename, options);
// console.log(baidu.frontia.personalStorage.uploadFile);