class BackGround extends React.Component{
  constructor(){
    super();
  }
  componentWillMount(){
  }
  render(){
  return (
      <section className="fog">
        <figure className="absolute-bg" style={{backgroundImage: "url('/images/photo.jpg')"}}>
        </figure>
        <div className="fog__container">
          <div className="fog__img fog__img--first"></div>
          <div className="fog__img fog__img--second"></div>
        </div>
      </section>
  )
  }
}
class LeftNav extends React.Component{
  constructor(props){
    super(props);
    this.state={
        name:uname||'',
        user_id: _id||'',
        type:props.type
    }
  }
  componentWillMount(){
      //console.log(uname)
	  console.log(this.state.type)
  }
  componentWillReceiveProps(nextProps){
      let obj={};
      if(nextProps.type){
	      obj.type=nextProps.type
      }
      this.setState(obj);
  }

  loginData(){
      let that=this;
      let winWidth=$(document).width();
      let winHeight=$(document).height();

      if(winWidth<500){
          layer.full(layer.open({
              type: 2,
              title:'',
              area: ['100%','100%'],
              content: ['/login/', 'no'],
			  closeBtn:2,
			  end: function () {
                  if($("#_id").val()!=''){
                      that.setState({name:$("#username").val(),user_id:$("#_id").val()});
                      layer.msg("登陆成功")
                  }
              }
          }));
      }else {
          layer.open({
              type: 2,
              title:'',
              area: ['4rem', '5.5rem'],
              content: ['/login/', 'no'],
              maxmin: true,
              end: function () {
                  if($("#_id").val()!=''){
                      that.setState({name:$("#username").val(),user_id:$("#_id").val()});
                      layer.msg("登陆成功")
                  }
              }
          });
      }

  }
  loginOut(){
    let that=this;
    Q.fcall(loginOut).then(rst=>{
        if(rst){
            $("#username").val("");
            $("#_id").val("");
            that.setState({name:'',user_id:''})
            layer.msg("退出成功",{
				time: 2000, //2s后自动关闭
				//btn: ['明白了', '知道了']
			});
        }

    }).catch(err=>{
        console.log(err);
    })

  }
  changeType(value){
	  this.props.changeType(value);
  };
  render(){
    return (
      <div className='leftNav noScrollDiv' id={'leftNav'}>
          <input type={"hidden"} id={"username"} readOnly={true}/>
		  <input type={"hidden"} id={"_id"} readOnly={true}/>
        <nav className='contentDiv'>
          <div className='tabText'>
              <div className="accountHello">
                  {this.state.name? <div>欢迎您<br/>{this.state.name}</div>:"请登录"}
              </div>
            <div className={"listClass"}>
                <a href={'javascript:void(0)'} onClick={this.changeType.bind(this,"home")} ><div className={ this.state.type=="home"?"liRadio itemRe":"itemRe"}>首页</div></a>
                {this.state.user_id?
                    <a href={'javascript:void(0)'} onClick={this.loginOut.bind(this)}><div className="itemRe">退出</div></a>:
                    <a href={'javascript:void(0)'} onClick={this.loginData.bind(this)}><div className="itemRe">登录</div></a>
                }
                <a href={'javascript:void(0)'} onClick={this.changeType.bind(this,"album")} ><div className={ this.state.type=="album"?"liRadio itemRe":"itemRe"}>相册</div></a>
                <a href={'javascript:void(0)'} onClick={this.changeType.bind(this,"home")} ><div className={ this.state.type=="home"?"liRadio itemRe":"itemRe"}>首页</div></a>
                <a href={'javascript:void(0)'} onClick={this.changeType.bind(this,"home")}><div  className={this.state.type=="home"?"liRadio itemRe":"itemRe"}>首页</div></a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
class Login_Form extends React.Component{
  constructor(){
    super();
    this.state={
      username:null,
      password:null
    };
  }
  componentWillMount(){

  }
    commitForm(){
    var _data={
      username:this.state.username,
      password:this.state.password
    };
    return ajaxUtil('/admin/login','POST',_data).then(function (rst) {
		var index = parent.layer.getFrameIndex(window.name);
		parent.$("#username").val(rst.data.uname);
		parent.$("#_id").val(rst.data._id);
		parent.layer.close(index);
    }).catch(err=>{
        console.log(err);
		ErrorMessage(err);
    });
    }
    registerForm(){
        var _data={
            username:this.state.username,
            password:this.state.password
        };
        return ajaxUtil('/admin/register','POST',_data).then(function (rst) {
            layer.msg('结果：'+rst);
        }).catch(err=>{
            console.log(err);
            ErrorMessage(err);
        });
    }
  unameInput(e){
    this.setState({username: e.target.value});
  }
  pwdInput(e){
    this.setState({password: e.target.value});
  }
  render(){
    return(<div>
            <div className="login noScrollDiv">
                <div className="login-top">
                    登录
                </div>
				<div></div>
                <div className="login-center clearfix">
                    <div className="login-center-img"><img src="/images/login/name.png"/></div>
                    <div className="login-center-input">
                        <input type="text" name="uname"  placeholder="请输入您的用户名"  onChange={this.unameInput.bind(this)}/>
                            <div className="login-center-input-text">用户名</div>
                    </div>
                </div>
               <div></div>
                <div className="login-center clearfix">
                    <div className="login-center-img"><img src="/images/login/password.png"/></div>
                    <div className="login-center-input">
                        <input type="password" name="upass"  placeholder="请输入您的密码" onChange={this.pwdInput.bind(this)}/>
                            <div className="login-center-input-text">密码</div>
                    </div>
                </div>
				<div></div>
                <div className="register">
                    <div className="login-button" onClick={this.commitForm.bind(this)}>
                        登录
                    </div>
                    <div className={"aHref"} onClick={this.registerForm.bind(this)}>注册</div>
                </div>

            </div>
            <div className="sk-rotating-plane"></div>
            <canvas className="particles-js-canvas-el" width="423" height="640"
                    style={{width: "100%",height: "100%"}}></canvas>
    </div>)
  }
}
var loginOut=function(){
   return ajaxUtil("/admin/loginOut","GET",null).then(rst=>{
        if(rst.data){
            return true;
            //setTimeout(window.location.href = "/Home",3000);
        }

    }).catch(err=>{
        throw  err;
        console.log(err);
    })
};
//router
var pageRouter = function(router) {
  var path = window.location.pathname.replace(/\/{2,}/g, '').replace(/\/$/, '');
  // router = router.toLowerCase();
  router = router ? router.toLowerCase().split('?')[0] : router.toLowerCase();
  if (router.indexOf(':') > -1) {
    var ps = router.split(':');
    var reg = '^';
    for (var i = 0; i < ps.length; i++) {
      if (ps[i].substring(0, 1) == '/') {
        reg = reg + ps[i];
      } else {
        var rs = ps[i].split('/');
        reg = reg + '.+';
        for (var j = 1; j < rs.length; j++) {
          reg = reg + '/' + rs[j];
        }
      }
    }
    var routerReg = new RegExp(reg + '$', 'i');
    return routerReg.test(path);
  } else {
    return path.toLowerCase() == router;
  }
};

var testFunction = function(){
  layer.msg('功能开发中');
};

function ajaxUtil(url, type, data, token) {
  var params = {
    url: url,
    type: type,
    data: data ? JSON.stringify(data) : null,
    beforeSend: function(request) {
      if (token) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
      }
      request.setRequestHeader("Content-Type", 'application/json');
    }
  };
  var defer = Q.defer();
  params.success = function(d) {
    defer.resolve(d);
  };
  params.error = function(d) {
      console.log(d);
    defer.reject(d);
  };
  $.ajax(params);
  return defer.promise;
}

function ErrorMessage(err){
	try {
		let message = "服务器错误！请联系管理员";
		if (err.message) {
			message = err.message;
		} else {
			console.log("err:" + err.responseText);
			let json = JSON.parse(err.responseText);
			console.log(json);
			message = json.message;
		}
		layer.msg(message);
	}catch (error){
	    console.log(error);
    }
}
//set query
var setQueryString = function (key, val) {
	var search = location.search.substr(1);
	var query = {};
	if (search) {
		search.split('&').forEach((item) => {
			var arr = item.split('=');
			query[arr[0]] = arr[1];
		});
	}
	query[key] = val;
	var queryArr = [];
	for (var p in query) {
		queryArr.push(p + '=' + query[p]);
	}
	history.replaceState(null, null, '?' + queryArr.join('&'));
};
//get query
var getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};

var q_setState=function (obj ,that){
    var defer = Q.defer();
    that.setState(obj, defer.makeNodeResolver());
    return defer.promise;
}
