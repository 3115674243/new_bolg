'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var weiXinShare_Page = function (_React$Component) {
	_inherits(weiXinShare_Page, _React$Component);

	function weiXinShare_Page() {
		_classCallCheck(this, weiXinShare_Page);

		var _this = _possibleConstructorReturn(this, (weiXinShare_Page.__proto__ || Object.getPrototypeOf(weiXinShare_Page)).call(this));

		_this.state = {
			_weiXInApi: '',
			zhi: ''
		};
		return _this;
	}

	_createClass(weiXinShare_Page, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var that = this;
			var wexinAgent = new wexinApi();
			var _weiXInApi = wexinAgent.weiXinApi();
			_weiXInApi.init('debug').then(function () {
				_weiXInApi.onShare({ desc: '这是测试页面数据' }, function (text) {
					console.log(text);
					that.seteState({ zhi: "123" + text });
					alert('调用成功');
				});
			}).catch(function (err) {
				console.error(err);
			});
			that.setState({ _weiXInApi: _weiXInApi });
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'\u4F60\u597D\uFF0C\u8FD9\u662F\u5FAE\u4FE1\u5206\u4EAB\u6D4B\u8BD5\u9875\u9762\u3002',
				React.createElement(
					'div',
					null,
					this.state.zhi
				)
			);
		}
	}]);

	return weiXinShare_Page;
}(React.Component);
