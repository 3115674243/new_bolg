var tools=(function(){
	function tools(){
	
	};
	tools.prototype.itemTouch = function(e,cb) {
		var startX,startY,endX,endY,distanceX,distanceY,dir="";
		e.addEventListener('touchstart', function(evt) {
			startX = evt.changedTouches[0].pageX;
			startY = evt.changedTouches[0].pageY;
		});
		e.addEventListener('touchmove', function(evt) {
			//touch==false ?evt.preventDefault():null;
			//获取滑动屏幕时的X,Y
			endX = evt.changedTouches[0].pageX;
			endY = evt.changedTouches[0].pageY;
			//获取滑动距离
			distanceX = endX-startX;
			distanceY = endY-startY;
			//判断滑动方向
			if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
				evt.preventDefault()
				dir="right";
				
				//console.log('往右滑动');
			}else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
				//console.log('往左滑动');
				evt.preventDefault()
				dir="left";
				
			}else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
				// console.log('往上滑动');
				
				dir="up";
				
			}else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
				//console.log('往下滑动');
				dir="down";
				
			}else{
				// console.log('点击未滑动');
				dir="null";
			}
		});
		e.addEventListener('touchend',function(evt){
			cb(e,dir);
		});
	};
	tools.prototype.browserRedirect=function() {
		let rst='pc';
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			rst='phone';
		}
		return rst;
	};
	
	return tools;
})();