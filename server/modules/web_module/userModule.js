var baseModule=require('../baseModule');
var util=require('util');
var tool=require('../../tools/tools');
var Q=require('q');
var user=function () {
    baseModule.apply(this);
    this.prepareModel("User");
};
util.inherits(user,baseModule);
user.prototype.loginForm=function (uname,upwd) {
	let that=this;
    return Q( this.findOne({uname:uname}).then(rst=>{
        let user=rst;
        if(rst){
           return   tool.bcrHash(upwd,user.upwd).then(function(res){
	           if(res){
		           return user;
	           }else {
		           throw that.rst.error("用户名或密码错误",null,400).toObj();
	           }
           });
        }else {
			throw that.rst.error("用户名或密码错误",null,400).toObj();
        }

    }));

};

user.prototype.registerForm=function (uname,upwd) {
    var that=this;
     return that.find({uname:uname}).then(rst=>{
         if(rst.length==0){
			 tool.bcrHashSnc(upwd,function(err,hash){
				 if(hash){
					 let user={uname:uname,upwd:hash};
					 console.log(user);
					 return that.save(user).then(rst=>{
						 cobsole.log(rst);
						 return rst;
					 })
				 }else {
					 console.log("err:"+err);
					 return err;
				 }
			 })
         }else {
			return -1;
         }
     });
};

module.exports=user;