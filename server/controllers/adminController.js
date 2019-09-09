var User=require('../modules/web_module/userModule');
var weixin=require('../modules/web_module/weXInModule');
var tools=require('../tools/tools');
var config=require('../config');
var Q = require('q');
var request = require('request');
module.exports={
	/*登录Post请求，*/
  login:function (req,res,next) {
     var _data=req.body;
     let username=_data.username;
     let password=_data.password;

     console.log(username,password);
     if(username&&password){
         let _user=new User();
         return _user.loginForm(username,password).then(rst=>{
             if(rst){
                 req.session.user=rst;
             }
             let data={uname:rst.uname,_id:rst._id};

             res.json(_user.rst.success("ok",data).toObj());
         }).catch(err=>{
             res.status(500).json({ message: err, statusCode: 400000, error: true});
             next(err,req,res);
         });
     }else {
         return res.status(400).json({ message: '参数不全', statusCode: 400000, error: true});
     }

  },
    register:function (req,res,next) {
    var _data=req.body;
    let username=_data.username;
    let password=_data.password;
	  let _user=new User();
	  console.log(username,password);
	  if(username&&password){
		  _user.registerForm(username,password).then(rst=>{
		      console.log(rst);
		      if(rst==-1){
				  return res.status(400).json({ message: '用户已存在', statusCode: 400000, error: true})
              }
			  return res.json("添加成功");
		  }).catch(err=>{
		      next(err, req, res)

		  }).done(function () {});
	  }else {
	  	console.log( typeof _user.rst.dError('缺少参数',400000));
          return res.status(400).json({ message: '缺少参数', statusCode: 400000, error: true})
	  }
  },
	/*登出*/
    loginOut:function(req,res,next){
      let _user=new User();
     return  Q(req.session.user = null).then(()=>{
         console.log("req.session.user");
         console.log(req.session.user)
           res.json(_user.rst.success("ok","退出成功").toObj())
      }).catch(err=>{
          console.log(err);
          next(err,req,res);
      })

    },
	weixinApi:function(req,res,next){
		var query = req.query;
		var echostr = query.echostr;
		res.send(echostr);
		//res.json(_user.rst.success("ok","微信接口接入成功").toObj())
	},
	weixinConfig:function(req,res,next){

		var url = req.query.url || '';
		var _timeStamp = Math.floor(Date.now() / 1000) + "";
    	let _weiXin=new weixin();
		var _nonceStr	=tools.generateNonceString();
		var sign = '';
		return _weiXin.getJSApiTicket().then(rst=>{
			let ticket=rst.ticket;

			if(ticket){
				return Q(_weiXin.generateSign({noncestr: _nonceStr, jsapi_ticket: ticket, timestamp: _timeStamp, url: url})).then(_sign=>{
					sign=_sign;
					return tools.getaccessToken(_weiXin.wxAccount.appid,_weiXin.wxAccount.appsecret);
				});
			}else {
				console.log("未获取到ticket")
			}
		}).then(accessToken=>{

			var _obj = {
				appId:config.weiXInConfig.appId,
				timeStamp:_timeStamp,
				nonceStr:_nonceStr,
				signature:sign,
				accessToken:accessToken
			};
			console.log(_obj);
			res.header("Access-Control-Allow-Origin","*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
			res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
			res.json(_obj);
		}).catch(err=>{
			console.log(err);
			next(err,req,res)
		});
	},
	testCapture:function(req,res,next){
    	let rst={};

    	Q.fcall(function(){
				try{request({
					uri: 'http://s-act.51huanche.com/api/resource/brands',
					method: 'GET',
					json: true,
					body: {}
				},function(err,response,body){
					if (err) { //网络错误，api无法连接
						var error = new Error();
						error.code = 500; //区分api返回的500错误
						error.statusCode = 500001;
						error.error = true;
						error.message = '系统错误，请稍后重试！';
						rst=error;
						console.log(error)
					} else { //非网络错误，api逻辑或者程序报错
						if (response.statusCode == 200) {
							rst=body;
							console.log(body)
						} else {
							var error = new Error();
							error.code = response.statusCode;
							error.error = true;
							// 此处添加对body.code的兼容，因为从rst过来的数据中没有statusCode只有code
							if (body.statusCode || body.code) {
								error.statusCode = body.statusCode || body.code; // 同上
								error.message = body.message;
							} else {
								error.statusCode = response.statusCode;
								error.message = response.statusMessage;
							}
							rst=error;
							console.log(error)
						}
					}
				})}catch (err){
					console.log(err);
				}
			}).then(()=>{
				res.json(rst);
			}).catch(err=>{
				console.log(err);
			})

	}

};
