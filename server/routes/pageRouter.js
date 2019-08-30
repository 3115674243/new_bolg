var express = require('express');
var pageRouter = express.Router();
var pageController=require('../controllers/pageController');
module.exports=function () {
  /* GET home page. */
  pageRouter.get('/', pageController.homePage);
  pageRouter.get('/yanwu', function(req, res, next) {
    res.render('yanwu', { title: 'Express' });
  });
  /*首页*/
  pageRouter.get('/home', pageController.homePage);
  /*登录页*/
  pageRouter.get('/login', pageController.loginPage);
  /*微信分享测试页面*/
  pageRouter.get('/weixin/share', pageController.weinSharePage);
  /*捕获测试*/
	pageRouter.get('/capture',function(req,res,next){
		res.render('CaptureTest',{title:"微信分享测试"});
  });
  return pageRouter;
};
