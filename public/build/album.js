"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Album = function (_React$Component) {
    _inherits(Album, _React$Component);

    function Album() {
        _classCallCheck(this, Album);

        var _this = _possibleConstructorReturn(this, (Album.__proto__ || Object.getPrototypeOf(Album)).call(this));

        _this.state = {
            dataMap: { "2019-3-4": [{ url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情真好", text: "这是随笔" }], "2019-3-5": [{ url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }, { url: ["/image/ceshi.jpg"], name: "今天心情也好", text: "这是随笔" }] }
        };
        return _this;
    }

    _createClass(Album, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "getData",
        value: function getData() {
            var url = "";
            ajaxUtil(url, 'get', null).then(function (rst) {
                return rst.data;
            }).catch(function (err) {
                ErrorMessage(err);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var dataMap = this.state.dataMap;
            return React.createElement(
                "div",
                { className: "homePage albumPage" },
                React.createElement(
                    "div",
                    { className: "albumBody scrollDiv" },
                    Object.keys(dataMap).map(function (key) {
                        return React.createElement(
                            "div",
                            { className: "album", key: key },
                            React.createElement(
                                "div",
                                { className: "" },
                                key
                            ),
                            React.createElement(
                                "div",
                                { className: "item" },
                                dataMap[key].map(function (item, index) {
                                    return React.createElement(
                                        "div",
                                        { className: "itemitem", key: key + "_" + index },
                                        item.name
                                    );
                                })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Album;
}(React.Component);
