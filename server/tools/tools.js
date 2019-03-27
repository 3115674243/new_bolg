var bcrypt = require('bcrypt-nodejs');
var util=require('util');
var request=require('request');
var Q=require('q');
module.exports={
  bcrHash:function(text,hash) {
	  var deferred = Q.defer();
        bcrypt.compare(text,hash,deferred.makeNodeResolver());
	  return deferred.promise;
  },
  bcrHashSnc:function(str,cb){
    console.log(str);
    var salt = bcrypt.genSaltSync(10);
     bcrypt.hash(str.toString(),salt,null,cb);
  },
	/*生成随机字符串*/
  generateNonceString : function(length){
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var maxPos = chars.length;
	var noceStr = "";
	for (var i = 0; i < (length || 32); i++) {
		noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return noceStr;
  },
  /*返回微信jsDK ccaseetoken*/
  getaccessToken:function(appid,appsecret){
		var deferred = Q.defer();
		var wxUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
		wxUrl = util.format(wxUrl, appid, appsecret);
		request.get({url: wxUrl}, deferred.makeNodeResolver());
		return deferred.promise.then(rst=>{
			let actk=JSON.parse(rst[0].body).access_token;
			let expires_in = rst.expires_in;
			if(actk){
				return actk;
			}else {
				console.log("未获取到access_token");
				return;
			}
		})
	}
};