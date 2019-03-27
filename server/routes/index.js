var express = require('express');
var router = express.Router();
var passport=require('../middleware/passport_third');
router.use(passport.passport.initialize());

var pageRouter=require('./pageRouter');
var testRouter=require('./testRouters');
var adminRouter=require('./admin');
router.use(pageRouter());
router.use('/test',testRouter());
router.use('/admin',adminRouter());
module.exports = router;
