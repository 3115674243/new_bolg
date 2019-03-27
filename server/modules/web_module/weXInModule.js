var sha1 = require('sha1');
var Mem=require('../../tools/rediswrapper');
var util=require('util');
var config=require('../../config');
var request=require('request');
var tools=require('../../tools/tools');
var Q=require('q');
var wexin=function (){
	this.mem=new Mem();
	this.wxAccount={
		appid:config.weiXInConfig.appId,
		appsecret:config.weiXInConfig.appsecret
	};
	this.tokenName = 'token'; // access_token缓存key
	this.ticketName = 'ticket'; // jsapi_ticket缓存key
};
// 获取jsapi_ticket
// 如果不存在或者超过指定时间则重新请求
wexin.prototype.getJSApiTicket = function () {
	var _this = this;
	var deferred = Q.defer();

	var _keyName = _this.ticketName + '_' + _this.wxAccount.appid;
	console.log(_keyName);
	return _this.mem.get(_keyName).then(function (value) {
		// 如果缓存数据不存在则重新通过AccessToken获取JSApiTicket
		if (!value) {
			Q(tools.getaccessToken(_this.wxAccount.appid,_this.wxAccount.appsecret)).then(token=>{
					return _this.setJSApiTicket(token);
				}).catch(err=>{
					console.log(err);
			});
		}
		else {
			console.log(value);
			console.log("value");
			return {ticket: value};
		}
	}).catch(err=>{
		console.log(err);
	});
	
};
// 添加jsapi_ticket
wexin.prototype.setJSApiTicket = function (token) {
	var _this = this;
	var deferred = Q.defer();
	var _url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
	
	request.get({url: _url}, deferred.makeNodeResolver());
	return deferred.promise.then(function (result) {
		if (result[0].statusCode == 200) {
			var _content = JSON.parse(result[0].body);
			var _ticket = _content.ticket;
			var _keyName = _this.ticketName + '_' + _this.wxAccount.appid;
			return _this.mem.setex(_keyName, _ticket, _content.expires_in).then(function () {
				return {ticket: _ticket,token:token};
			});
		}
		else return null;
	});
};
wexin.prototype.generateSign=function(params){
	var querystring = Object.keys(params)
		.filter(function (key) {
			return params[key] !== undefined && params[key] !== '' && ['noncestr', 'jsapi_ticket', 'timestamp', 'url'].indexOf(key) >= 0;
		})
		.sort()
		.map(function (key) {
			return key + '=' + params[key];
		})
		.join("&");
	
	return sha1(querystring);
};
module.exports=wexin;