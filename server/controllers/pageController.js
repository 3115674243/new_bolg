var adminRender=require('../render/adminRender');
var Q = require('q');

module.exports={
	homePage:function(req,res,next){
		let admin= new adminRender(req.session.user);
		return admin.homeRender(res);
		next();
	},
	loginPage:function(req,res,next){
		let admin= new adminRender(req.session.user);
		return admin.loginRender(res);
		next();
	},
	weinSharePage:function(req,res,next){
		let admin= new adminRender(req.session.user);
		return admin.weixinShareRender(res);
		next();
	},
};