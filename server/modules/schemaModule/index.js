var mongoose=require('../../config/db').mongoose;
var modules={};
require('./user.js');
modules.User=mongoose.model("User");
module.exports=modules;