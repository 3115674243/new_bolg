"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackGround = function (_React$Component) {
  _inherits(BackGround, _React$Component);

  function BackGround() {
    _classCallCheck(this, BackGround);

    return _possibleConstructorReturn(this, (BackGround.__proto__ || Object.getPrototypeOf(BackGround)).call(this));
  }

  _createClass(BackGround, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        { className: "fog" },
        React.createElement("figure", { className: "absolute-bg", style: { backgroundImage: "url('/images/photo.jpg')" } }),
        React.createElement(
          "div",
          { className: "fog__container" },
          React.createElement("div", { className: "fog__img fog__img--first" }),
          React.createElement("div", { className: "fog__img fog__img--second" })
        )
      );
    }
  }]);

  return BackGround;
}(React.Component);

var LeftNav = function (_React$Component2) {
  _inherits(LeftNav, _React$Component2);

  function LeftNav(props) {
    _classCallCheck(this, LeftNav);

    var _this2 = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, props));

    _this2.state = {
      name: uname || '',
      user_id: _id || '',
      type: props.type
    };
    return _this2;
  }

  _createClass(LeftNav, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      //console.log(uname)
      console.log(this.state.type);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var obj = {};
      if (nextProps.type) {
        obj.type = nextProps.type;
      }
      this.setState(obj);
    }
  }, {
    key: "loginData",
    value: function loginData() {
      var that = this;
      var winWidth = $(document).width();
      var winHeight = $(document).height();

      if (winWidth < 500) {
        layer.full(layer.open({
          type: 2,
          title: '',
          area: ['100%', '100%'],
          content: ['/login/', 'no'],
          closeBtn: 2,
          end: function end() {
            if ($("#_id").val() != '') {
              that.setState({ name: $("#username").val(), user_id: $("#_id").val() });
              layer.msg("登陆成功");
            }
          }
        }));
      } else {
        layer.open({
          type: 2,
          title: '',
          area: ['4rem', '5.5rem'],
          content: ['/login/', 'no'],
          maxmin: true,
          end: function end() {
            if ($("#_id").val() != '') {
              that.setState({ name: $("#username").val(), user_id: $("#_id").val() });
              layer.msg("登陆成功");
            }
          }
        });
      }
    }
  }, {
    key: "loginOut",
    value: function loginOut() {
      var that = this;
      Q.fcall(_loginOut).then(function (rst) {
        if (rst) {
          $("#username").val("");
          $("#_id").val("");
          that.setState({ name: '', user_id: '' });
          layer.msg("退出成功", {
            time: 2000 //2s后自动关闭
            //btn: ['明白了', '知道了']
          });
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "changeType",
    value: function changeType(value) {
      this.props.changeType(value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "leftNav noScrollDiv", id: 'leftNav' },
        React.createElement("input", { type: "hidden", id: "username", readOnly: true }),
        React.createElement("input", { type: "hidden", id: "_id", readOnly: true }),
        React.createElement(
          "nav",
          { className: "contentDiv" },
          React.createElement(
            "div",
            { className: "tabText" },
            React.createElement(
              "div",
              { className: "accountHello" },
              this.state.name ? React.createElement(
                "div",
                null,
                "\u6B22\u8FCE\u60A8",
                React.createElement("br", null),
                this.state.name
              ) : "请登录"
            ),
            React.createElement(
              "div",
              { className: "listClass" },
              React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.changeType.bind(this, "home") },
                React.createElement(
                  "div",
                  { className: this.state.type == "home" ? "liRadio itemRe" : "itemRe" },
                  "\u9996\u9875"
                )
              ),
              this.state.user_id ? React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.loginOut.bind(this) },
                React.createElement(
                  "div",
                  { className: "itemRe" },
                  "\u9000\u51FA"
                )
              ) : React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.loginData.bind(this) },
                React.createElement(
                  "div",
                  { className: "itemRe" },
                  "\u767B\u5F55"
                )
              ),
              React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.changeType.bind(this, "album") },
                React.createElement(
                  "div",
                  { className: this.state.type == "album" ? "liRadio itemRe" : "itemRe" },
                  "\u76F8\u518C"
                )
              ),
              React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.changeType.bind(this, "home") },
                React.createElement(
                  "div",
                  { className: this.state.type == "home" ? "liRadio itemRe" : "itemRe" },
                  "\u9996\u9875"
                )
              ),
              React.createElement(
                "a",
                { href: 'javascript:void(0)', onClick: this.changeType.bind(this, "home") },
                React.createElement(
                  "div",
                  { className: this.state.type == "home" ? "liRadio itemRe" : "itemRe" },
                  "\u9996\u9875"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return LeftNav;
}(React.Component);

var Login_Form = function (_React$Component3) {
  _inherits(Login_Form, _React$Component3);

  function Login_Form() {
    _classCallCheck(this, Login_Form);

    var _this3 = _possibleConstructorReturn(this, (Login_Form.__proto__ || Object.getPrototypeOf(Login_Form)).call(this));

    _this3.state = {
      username: null,
      password: null
    };
    return _this3;
  }

  _createClass(Login_Form, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "commitForm",
    value: function commitForm() {
      var _data = {
        username: this.state.username,
        password: this.state.password
      };
      return ajaxUtil('/admin/login', 'POST', _data).then(function (rst) {
        var index = parent.layer.getFrameIndex(window.name);
        parent.$("#username").val(rst.data.uname);
        parent.$("#_id").val(rst.data._id);
        parent.layer.close(index);
      }).catch(function (err) {
        console.log(err);
        ErrorMessage(err);
      });
    }
  }, {
    key: "registerForm",
    value: function registerForm() {
      var _data = {
        username: this.state.username,
        password: this.state.password
      };
      return ajaxUtil('/admin/register', 'POST', _data).then(function (rst) {
        layer.msg('结果：' + rst);
      }).catch(function (err) {
        console.log(err);
        ErrorMessage(err);
      });
    }
  }, {
    key: "unameInput",
    value: function unameInput(e) {
      this.setState({ username: e.target.value });
    }
  }, {
    key: "pwdInput",
    value: function pwdInput(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "login noScrollDiv" },
          React.createElement(
            "div",
            { className: "login-top" },
            "\u767B\u5F55"
          ),
          React.createElement("div", null),
          React.createElement(
            "div",
            { className: "login-center clearfix" },
            React.createElement(
              "div",
              { className: "login-center-img" },
              React.createElement("img", { src: "/images/login/name.png" })
            ),
            React.createElement(
              "div",
              { className: "login-center-input" },
              React.createElement("input", { type: "text", name: "uname", placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u7528\u6237\u540D", onChange: this.unameInput.bind(this) }),
              React.createElement(
                "div",
                { className: "login-center-input-text" },
                "\u7528\u6237\u540D"
              )
            )
          ),
          React.createElement("div", null),
          React.createElement(
            "div",
            { className: "login-center clearfix" },
            React.createElement(
              "div",
              { className: "login-center-img" },
              React.createElement("img", { src: "/images/login/password.png" })
            ),
            React.createElement(
              "div",
              { className: "login-center-input" },
              React.createElement("input", { type: "password", name: "upass", placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801", onChange: this.pwdInput.bind(this) }),
              React.createElement(
                "div",
                { className: "login-center-input-text" },
                "\u5BC6\u7801"
              )
            )
          ),
          React.createElement("div", null),
          React.createElement(
            "div",
            { className: "register" },
            React.createElement(
              "div",
              { className: "login-button", onClick: this.commitForm.bind(this) },
              "\u767B\u5F55"
            ),
            React.createElement(
              "div",
              { className: "aHref", onClick: this.registerForm.bind(this) },
              "\u6CE8\u518C"
            )
          )
        ),
        React.createElement("div", { className: "sk-rotating-plane" }),
        React.createElement("canvas", { className: "particles-js-canvas-el", width: "423", height: "640",
          style: { width: "100%", height: "100%" } })
      );
    }
  }]);

  return Login_Form;
}(React.Component);

var _loginOut = function _loginOut() {
  return ajaxUtil("/admin/loginOut", "GET", null).then(function (rst) {
    if (rst.data) {
      return true;
      //setTimeout(window.location.href = "/Home",3000);
    }
  }).catch(function (err) {
    throw err;
    console.log(err);
  });
};
//router
var pageRouter = function pageRouter(router) {
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

var testFunction = function testFunction() {
  layer.msg('功能开发中');
};

function ajaxUtil(url, type, data, token) {
  var params = {
    url: url,
    type: type,
    data: data ? JSON.stringify(data) : null,
    beforeSend: function beforeSend(request) {
      if (token) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
      }
      request.setRequestHeader("Content-Type", 'application/json');
    }
  };
  var defer = Q.defer();
  params.success = function (d) {
    defer.resolve(d);
  };
  params.error = function (d) {
    console.log(d);
    defer.reject(d);
  };
  $.ajax(params);
  return defer.promise;
}

function ErrorMessage(err) {
  try {
    var message = "服务器错误！请联系管理员";
    if (err.message) {
      message = err.message;
    } else {
      console.log("err:" + err.responseText);
      var json = JSON.parse(err.responseText);
      console.log(json);
      message = json.message;
    }
    layer.msg(message);
  } catch (error) {
    console.log(error);
  }
}
//set query
var setQueryString = function setQueryString(key, val) {
  var search = location.search.substr(1);
  var query = {};
  if (search) {
    search.split('&').forEach(function (item) {
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
var getQueryString = function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

var q_setState = function q_setState(obj, that) {
  var defer = Q.defer();
  that.setState(obj, defer.makeNodeResolver());
  return defer.promise;
};
