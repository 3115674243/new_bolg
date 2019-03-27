var express = require('express');
var adminRouter = express.Router();
var adminController=require('../../controllers/adminController');
module.exports=function () {
  adminRouter.post('/login', adminController.login);
  adminRouter.post('/register', adminController.register);
  adminRouter.get('/loginOut', adminController.loginOut);
  adminRouter.post('/weixin/api', adminController.weixinApi);
  adminRouter.get('/weixin/api', adminController.weixinApi);
  adminRouter.get('/weixin/InitConfig',adminController.weixinConfig);
  return adminRouter;
};