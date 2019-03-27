var mongoose=require('../../config/db').mongoose;
var tool=require('../../tools/tools');
var userSchema=new mongoose.Schema({
  uname:{type:String,required: true, unique: true},
  upwd:{type:String,required:true},
  email: {type: String}, 				// 邮件地址
  phone: {type: String}
},{
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});
/*userSchema.methods.loginForm=function (uname,upwd,cb) {
  this.findOne({uname:uname},function (err,user) {
        if(err) return cb(err);
        tool.bcrHash(upwd,user.upwd,function(err,res){
            if(res){
                return cb(null,user);
            }else {
                return cb(err);
            }
        });
    });
};*/
module.exports =mongoose.model('User', userSchema);