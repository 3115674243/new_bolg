var express = require('express');
var router = express.Router();
var adminCotroller=require('../controllers/adminController')
module.exports=function () {
  router.get('/testLogin',function (req,res,next) {
    res.render('test/testLogin',{title:'testlogin'});
  });
	router.get('/testCapture',adminCotroller.testCapture);
  return router;
};


