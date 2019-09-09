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
            user_image: user_image || null,
            max: 4, //轮播最大值
            index: 0, //轮播位置
            show: true
        };
        return _this2;
    }

    _createClass(HomeView, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "changeList",
        value: function changeList() {
            var that = this;
            var i = that.state.index;
            var render = void 0;
            switch (i) {
                case 0:
                    render = React.createElement(
                        "div",
                        { className: "givectent" },
                        React.createElement(
                            "div",
                            { className: "contBody" },
                            React.createElement("img", { src: "/images/login/bg.jpg", style: { height: "60vh", width: "90%", animation: "changeInto .5s ease-in-out" } }),
                            React.createElement("img", { src: "/images/my.jpg", style: { position: "relative", left: "-17vh", width: "35vh", animation: "changeInto .7s ease-in-out" } })
                        ),
                        React.createElement(
                            "div",
                            { className: "contText" },
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "h2",
                                    null,
                                    "\u60A8\u597D\uFF0C\u6211\u662F\u5F20\u8D85",
                                    React.createElement("br", null),
                                    "\u9AD8\u7EA7\u8F6F\u4EF6\u5DE5\u7A0B\u5E08",
                                    React.createElement("br", null)
                                ),
                                "\u60A8\u7684\u9879\u76EE\u65E0\u6CD5\u628A\u63A7\u8FDB\u5EA6\u5417\uFF1F\u60A8\u65E0\u6CD5\u77E5\u6089\u5F00\u53D1\u6D41\u7A0B\u5404\u4E2A\u73AF\u8282\u7684\u96BE\u70B9\u548C\u6210\u672C\u5417\uFF1F",
                                React.createElement("br", null),
                                "\u60A8\u7684\u9879\u76EE\u9047\u5230\u4E86\u6280\u672F\u95EE\u9898\u5417\uFF1F\u6211\u8BA4\u4E3A\u6211\u53EF\u4EE5\u4E3A\u60A8\u5206\u62C5\u4E9B\u538B\u529B",
                                React.createElement("br", null),
                                "\u6211\u7684\u7279\u957F\u662Fnodejs\u65B9\u5411\u7684\u5F00\u53D1\uFF0C\u9762\u5BF9\u4E00\u822C\u7684\u9762\u5411\u5BF9\u8C61\u578B\u8BED\u8A00\u90FD\u6709\u4E00\u5B9A\u7684\u4E86\u89E3",
                                React.createElement("br", null),
                                "\u5E76\u4E14\u6211\u8FD8\u662F\u4E00\u540D\u517C\u804C\u524D\u7AEF\u5DE5\u7A0B\u5E08\uFF0C\u9488\u5BF9android\u79FB\u52A8\u7AEF\u719F\u6089react-native\u5236\u4F5C",
                                React.createElement("br", null)
                            )
                        )
                    );
                    break;
                case 1:
                    render = React.createElement(
                        "div",
                        { className: "givectent" },
                        React.createElement(
                            "div",
                            { className: "contBody2" },
                            React.createElement(
                                "div",
                                { className: "bodyList" },
                                React.createElement("img", { src: "/images/project/素材.jpg", style: { position: "relative", height: "100%", margin: "auto", animation: "changeInto .4s ease-in-out" } }),
                                React.createElement("img", { src: "/images/project/素材3.png", style: { position: "relative", height: "100%", margin: "auto", animation: "changeInto .6s ease-in-out" } })
                            ),
                            React.createElement(
                                "div",
                                { className: "bodyText" },
                                "\u72EC\u7ACB\u7814\u53D1reactnative\u79FB\u52A8\u7AEF\uFF0C\u7528\u4E8E\u5DE5\u4E1A\u5316"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "contText" },
                            React.createElement(
                                "div",
                                { style: { width: "80%" } },
                                React.createElement(
                                    "h2",
                                    null,
                                    "\u5FEB\u901F\u5B66\u4E60\u5E76\u8FD0\u7528\u5B9E\u6218"
                                ),
                                "\u60A8\u7684\u4E1A\u52A1\u6D89\u53CA\u5230\u4E86\u79FB\u52A8\u7AEF\u5F00\u53D1\uFF1F\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\uFF0CandroidAPP\u3001H5\u7F51\u9875\u5E94\u7528\uFF0C\u90FD\u4E0D\u5728\u8BDD\u4E0B",
                                React.createElement("br", null),
                                "\u6211\u719F\u7EC3\u8FD0\u7528reactnative\u5F00\u53D1android\u5E94\u7528\uFF0C\u5E76\u4E86\u89E3rn\u539F\u751F\u4EA4\u4E92"
                            )
                        )
                    );
                    break;
                case 2:
                    render = React.createElement(
                        "div",
                        { className: "givectent" },
                        React.createElement(
                            "div",
                            { className: "contBody3", style: { position: "relative", animation: "changeInto .7s ease-in-out" } },
                            React.createElement(
                                "div",
                                { className: "body3Item", style: { position: "relative", animation: "changeInto .7s ease-in-out" } },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "01"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u826F\u597D\u7684\u4EE3\u7801\u7D20\u517B"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "body3Item", style: { position: "relative", animation: "changeInto .9s ease-in-out" } },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "02"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u4E2A\u4EBA\u76EE\u6807\u786E\u5B9A"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "body3Item", style: { position: "relative", animation: "changeInto 1.2s ease-in-out" } },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "03"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u57FA\u4E8E\u4E1A\u52A1\u7EFC\u5408\u8F6F\u4EF6\u65B9\u6848"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "contBody3", style: { position: "relative", animation: "changeInto 1.2s ease-in-out" } },
                            React.createElement(
                                "div",
                                { className: "body3Item" },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "04"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u826F\u597D\u7684\u9700\u6C42\u5BA2\u6237\u4E0E\u5F00\u53D1\u6280\u672F\u5BF9\u63A5"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "body3Item", style: { position: "relative", animation: "changeInto 1.5s ease-in-out" } },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "05"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u9879\u76EE\u6D41\u7A0B\u6E05\u6670\u660E\u6717"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "body3Item", style: { position: "relative", animation: "changeInto 1.7s ease-in-out" } },
                                React.createElement(
                                    "div",
                                    { className: "leftSpan" },
                                    "06"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "bodyText" },
                                    "\u5C06\u60A8\u7684\u9700\u6C42\u8F6C\u5316\u4E3A\u4EA7\u54C1"
                                )
                            )
                        )
                    );
                    break;
                case 3:
                    render = React.createElement(
                        "div",
                        { className: "givectent" },
                        React.createElement(
                            "div",
                            { className: "contBody4" },
                            React.createElement("img", { src: "/images/project/大区图片.png", style: { position: "relative", height: "100%", top: "12vh", margin: "auto", animation: "changeLeft .5s ease-in-out" } }),
                            React.createElement("img", { src: "/images/project/大区管理.png", style: { position: "relative", height: "100%", margin: "auto", animation: "changeInto .7s ease-in-out" } }),
                            React.createElement(
                                "div",
                                { className: "bodyItem" },
                                React.createElement(
                                    "h2",
                                    null,
                                    "\u5E73\u53F0\u5316\u5927\u533A\u6570\u636E\u7EDF\u8BA1"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "contText" },
                            React.createElement(
                                "div",
                                null,
                                "\u62E5\u6709\u826F\u597D\u7684\u4EE3\u7801\u4E60\u60EF",
                                React.createElement("br", null),
                                "\u9AD8\u6548\u7684\u63A5\u53E3\u8BBE\u8BA1",
                                React.createElement("br", null),
                                "\u826F\u597D\u7684\u89E3\u8026",
                                React.createElement("br", null),
                                "\u9AD8\u5EA6\u590D\u7528\u6027\u7684\u7ED3\u6784",
                                React.createElement("br", null),
                                React.createElement(
                                    "h2",
                                    null,
                                    "\u6784\u5EFA\u5FEB\u901F\u7A33\u5B9A\u7684\u6570\u636E\u4EA4\u4E92"
                                )
                            )
                        )
                    );
                    break;
            }
            return render;
        }
    }, {
        key: "render",
        value: function render() {
            var that = this;
            var Icon = antd.Icon;
            var index = that.state.index;
            var max = that.state.max;
            return React.createElement(
                "div",
                { className: 'homePage  noScrollDiv' },
                React.createElement(
                    "div",
                    { className: "bodyHome" },
                    React.createElement(
                        "div",
                        { className: "navga" },
                        React.createElement(
                            "div",
                            { className: "leftNavg" },
                            that.state.index > 0 ? React.createElement(Icon, { type: "left", style: { color: "#fff", fontSize: 30 }, onClick: function onClick() {
                                    q_setState({ show: false }, that).then(function (ok) {
                                        q_setState({ index: index - 1, show: true }, that);
                                    });
                                } }) : null
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "ctent" },
                        that.state.show ? that.changeList() : null
                    ),
                    React.createElement(
                        "div",
                        { className: "navga" },
                        React.createElement(
                            "div",
                            { className: "rightNavg" },
                            that.state.index < max - 1 ? React.createElement(Icon, { type: "right", style: { color: "#fff", fontSize: 30 }, onClick: function onClick() {

                                    q_setState({ show: false }, that).then(function (ok) {
                                        q_setState({ index: index + 1, show: true }, that);
                                    });
                                } }) : null
                        )
                    )
                ),
                React.createElement("footer", { className: "homeFoter" })
            );
        }
    }]);

    return HomeView;
}(React.Component);

var homeBody = function (_React$Component3) {
    _inherits(homeBody, _React$Component3);

    function homeBody(props) {
        _classCallCheck(this, homeBody);

        var _this3 = _possibleConstructorReturn(this, (homeBody.__proto__ || Object.getPrototypeOf(homeBody)).call(this, props));

        _this3.state = {};
        return _this3;
    }

    _createClass(homeBody, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var that = this;
        }
    }, {
        key: "getRender",
        value: function getRender(item) {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ctent" },
                React.createElement("div", { className: "contBody" }),
                React.createElement("div", { className: "contText" })
            );
        }
    }]);

    return homeBody;
}(React.Component);
