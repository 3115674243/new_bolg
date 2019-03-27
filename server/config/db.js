var settings=require("./index").MongoSettings;

var mongoose=require('mongoose');
mongoose.connect(settings.mongodb,settings.options);
var db=mongoose.connection;
mongoose.Promise = require("q").Promise;
/**
 * 连接成功
 */
db.on('connected', function () {
  console.log('Mongoose connection open to ' + settings.mongodb);
});

/**
 * 连接异常
 */
db.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
db.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});


module.exports={
  "dbCon":db,
  "mongoose":mongoose
};