"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home_Page = function (_React$Component) {
  _inherits(Home_Page, _React$Component);

  function Home_Page() {
    _classCallCheck(this, Home_Page);

    var _this = _possibleConstructorReturn(this, (Home_Page.__proto__ || Object.getPrototypeOf(Home_Page)).call(this));

    _this.state = {
      type: getQueryString("type") || "home"
    };
    return _this;
  }

  _createClass(Home_Page, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var that = this;
      that.slideMenu();
    }
  }, {
    key: "slideMenu",
    value: function slideMenu() {
      var that = this;
      var tool = new tools();
      tool.itemTouch(document.getElementById("container"), that.navShowAndHidden);
    }
  }, {
    key: "navShowAndHidden",
    value: function navShowAndHidden(e, state) {
      var evt = document.getElementById('leftNav');

      // console.log(state);
      switch (state) {
        case 'left':
          if (!evt.classList.contains("leftNavHidden")) {
            evt.classList.add("leftNavHidden");
            $(".homePage").addClass("homePageLeft");
          }
          break;
        case 'right':
          if (evt.classList.contains("leftNavHidden")) {
            evt.classList.remove("leftNavHidden");
            $(".homePage").removeClass("homePageLeft");
          }
          break;
      }
    }
  }, {
    key: "changeType",
    value: function changeType(value) {
      if (this.state.type != value) {
        setQueryString("type", value);
        this.setState({ type: value });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var type = this.state.type;
      return React.createElement(
        "div",
        { className: "layOutPage noScrollDiv" },
        React.createElement(LeftNav, { changeType: this.changeType.bind(this), type: this.state.type }),
        type == "home" ? React.createElement(HomeView, null) : type == "album" ? React.createElement(Album, null) : React.createElement(HomeView, null),
        React.createElement(BackGround, null)
      );
    }
  }]);

  return Home_Page;
}(React.Component);

var HomeView = function (_React$Component2) {
  _inherits(HomeView, _React$Component2);

  function HomeView() {
    _classCallCheck(this, HomeView);

    var _this2 = _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this));

    _this2.state = {
      user_image: user_image || null
    };
    return _this2;
  }

  _createClass(HomeView, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: 'homePage  noScrollDiv' },
        React.createElement(
          "div",
          { className: "home" },
          React.createElement(
            "div",
            { className: "topIndex" },
            React.createElement(
              "div",
              { className: "portrait" },
              React.createElement("img", { src: this.state.user_image || '/images/portrait.jpg' })
            )
          ),
          React.createElement(
            "div",
            { className: "bodyHome" },
            "\u4E3B\u4F53"
          ),
          React.createElement("div", { id: "main", style: { width: '4rem', height: '2.56rem' }, className: "divCtent" })
        )
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [{
          name: '文章类型',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 274, name: '联盟广告' }, { value: 235, name: '视频广告' }, { value: 400, name: '搜索引擎' }].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.9)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.9)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#00B7FF',
              shadowBlur: 200,
              shadowColor: 'rgba(41, 182,246, 0.5)'

            }

          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function animationDelay(idx) {
            return Math.random() * 200;
          }
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }]);

  return HomeView;
}(React.Component);
