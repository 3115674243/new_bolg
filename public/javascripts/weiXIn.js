var wexinApi=(function(){
	var weixin=function (){
	};
	weixin.prototype.getShareUrl = function () {
		var protocol = window.location.protocol;
		var host = window.location.host;
		return protocol + '//' +location.pathname;
	};
	weixin.prototype.weiXinApi=function(){
		var that = this;
		var _domain = this.domain || 'http://agvggf.natappfree.cc';
		var defVal = {
			debug: false,
			jsApiList: [
				'updateTimelineShareData',
				'updateAppMessageShareData',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'scanQRCode',
				'chooseImage',
				'uploadImage',
				'getLocation',
				'openLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'closeWindow'
			]
		};
		
		return {
			onShare: function (data, fn) {
				var _def = {
					title: document.title,
					image: _domain + '/images/wx-share.jpg',
					url: that.getShareUrl()
				};
				var _data = $.extend(_def, data);
				if (!/^((http)|(https)):\/\//.test(_data.image)) {
					_data.image = window.location.protocol + '//' + window.location.host + _data.image;
				}
				console.log(_data);
				wx.ready(function () {
					// 分享朋友圈
					wx.onMenuShareTimeline({
						title: data.title,
						link: data.url,
						imgUrl: data.image,
						success: function (rst) {
							alert('分享朋友圈');
							alert(JSON.stringify(rst));
							if (fn && fn instanceof Function) {
								fn.call(null, 'Timeline');
							}
						}
					});
					// 分享好友
					wx.onMenuShareAppMessage({
						title: data.title,
						desc: data.desc,
						link: data.url,
						imgUrl: data.image,
						success:function (rst) {
							alert('分享好友');
							alert(JSON.stringify(rst));
							if (fn && fn instanceof Function) {
								fn.call(null, 'AppMessage');
							}
						},
						fail: function (res) {
							alert(JSON.stringify(res) + '失败');
							// 转发失败
						},
					});
					
					// 分享到QQ
					wx.onMenuShareQQ({
						title: data.title,
						desc: data.desc,
						link: data.url,
						imgUrl: data.image,
						success: function () {
							alert('分享到QQ');
							if (fn && fn instanceof Function) {
								fn.call(null, 'QQ');
							}
						},
						cancel: function () {}
					});
					
					// 分享到微博
					// wx.onMenuShareWeibo({
					// 	title: data.title,
					// 	desc: data.desc,
					// 	link: data.url,
					// 	imgUrl: data.image,
					// 	success: function () {
					// 		if (fn && fn instanceof Function) {
					// 			fn.call(null, 'Weibo');
					// 		}
					// 	},
					// 	cancel: function () {}
					// });
				});
				wx.error(function(err){
					alert(JSON.stringify(err));
				});
			},
			init: function (isDebug) {
				return $.ajax({
					type: 'get',
					async: true,
					url: _domain + '/admin/weixin/InitConfig',
					data: {
						url: window.location.href.replace(/#.*$/, "")
					},
					dataType: 'json',
				}).then(function (d) {
					console.log("成功")
					var config = {
						appId: d.appId, // 必填，公众号的唯一标识
						timestamp: d.timeStamp,// 必填，生成签名的时间戳
						nonceStr: d.nonceStr,// 必填，生成签名的随机串
						signature: d.signature,// 必填，签名
						jsApiList: [] // 必填，需要使用的JS接口列表
					};
					that.wxAccessToken = d.accessToken; // 微信jssdk的access token
					let data=$.extend({}, config,defVal);
					if (isDebug !== undefined) {
						data.debug = isDebug;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					}
					console.log(data)
					wx.config(data);
					return;
				}).catch(err=>{
					console.log(err);
				});
			}
		};
	}
	weixin.prototype.buildRedirect = function (scope) {
		var _ru = window.location.href.replace(/(\?|&)openid=.*$/i, "").replace(/(\?|&)unionid=.*$/i, "").replace(/(\?|&)state=.*$/i, "");
		var _newState;
		_newState = Date.now() + Math.random();
		_stateStr = '&STATE=' + _newState;
		window.localStorage.STATE = _newState;
		this.state = _newState; //拿openid的时候带上state，并保存在前端，未收到openid做比较。
		var _url = ((scope ? this.config.info : this.config.oid) + this.key + '?ru=' + encodeURIComponent(_ru.replace(/#.*$/, "")) + _stateStr);
		return _url;
	};
	weixin.prototype.redirect = function (url) {
		window.location.href = url;
	};
	weixin.prototype.getopenid = function (scope) {
		var d = $.Deferred();
		
		//非微信浏览器
		if (!this.isWeixinBrowser()) {
			this.openid = 'invalid';
			this.unionid = 'invalid';
			return d.resolve(this.openid);
		}
		
		if (this.openid !== undefined) {
			//如果openid已经取得，则直接返回之
			return d.resolve(this.openid);
		}
		
		//静默授权
		if (!scope) {
			if (this.getStorageInfo()) {
				//缓存取得
				return d.resolve(this.openid);
			}
			
			if (this.checkUrlParams()) {
				//url取得
				return d.resolve(this.openid);
			}
			
			this.redirect(this.buildRedirect());
			return d.resolve('invalid');
		}
		
		//非静默授权
		if (this.checkUrlParams()) {
			return d.resolve(this.openid);
		}
		
		this.redirect(this.buildRedirect(true));
		return d.resolve('invalid');
	};
	return weixin;
})();