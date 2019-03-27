
$(document).ready(function () {
  var container = document.getElementById('container');
  var content = null;
  var curItem = 'Home';

  for(var item in RouterItems){
    if(pageRouter(RouterItems[item].url)){
      curItem = item;
      break;
    }
  }
  var com=RouterItems[curItem];
  if(!com) return;
  if(com.page){
    content=<com.page/>;
  }else{
    alert('页面加载错误，请联系管理员');
  }

  ReactDOM.render(content, container);
});

var RouterItems={
    Home:{url:'/home',page:getComponent('Home_Page'),title:'首页'},
    login:{url:'/login',page:getComponent('Login_Form'),title:'登录'},
    weiXinShare:{url:'/weixin/share',page:getComponent('weiXinShare_Page'),title:'微信接口测试页面'}
};
function getComponent(cname) {

  return window[cname]? window[cname]:null;
}