var Q = require('q');
var _=require("lodash");
var adminRender=function (user){
	this.user={};
	if(user){
		this.user=user;
	}
	this.baseUser={
		uname:this.user.uname||'',
		_id:this.user._id||'',
		user_image:this.user.user_image||''
	}
};
adminRender.prototype.homeRender=function(res){
	res.render('home',_.extend({title:"Home"},this.baseUser));
};
adminRender.prototype.loginRender=function(res){
	res.render('home',_.extend({title:"Login"},this.baseUser));
};
adminRender.prototype.weixinShareRender=function(res){
	res.render('test/weixinShare',_.extend({title:"微信分享测试"},this.baseUser));
};

module.exports=adminRender;