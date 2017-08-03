"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLaunchDarkly = require("react-launch-darkly");

var _Session = require("../constants/Session");

var _OktaLogin = require("../components/OktaLogin");

var _OktaLogin2 = _interopRequireDefault(_OktaLogin);

var _NoAuthLogin = require("../components/NoAuthLogin");

var _NoAuthLogin2 = _interopRequireDefault(_NoAuthLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequireAuth = function (_Component) {
  _inherits(RequireAuth, _Component);

  function RequireAuth(props) {
    _classCallCheck(this, RequireAuth);

    var _this = _possibleConstructorReturn(this, (RequireAuth.__proto__ || Object.getPrototypeOf(RequireAuth)).call(this, props));

    _this.state = {
      checkedSession: false
    };

    _this._renderOkta = _this._renderOkta.bind(_this);
    _this._renderNoAuth = _this._renderNoAuth.bind(_this);
    return _this;
  }

  _createClass(RequireAuth, [{
    key: "componentDidMount",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var sessionUrl, _props, loadSessionFromServer, session;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionUrl = this.props.route.sessionUrl;
                _props = this.props, loadSessionFromServer = _props.loadSessionFromServer, session = _props.session;

                if (!(session.status !== _Session.sessionStateConstants.LOGGED_IN)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return loadSessionFromServer(sessionUrl);

              case 5:
                this.setState({ checkedSession: true });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var checkedSession = this.state.checkedSession;
      var _props2 = this.props,
          session = _props2.session,
          children = _props2.children;


      if (session.status === _Session.sessionStateConstants.LOGGED_IN) {
        return children;
      }

      if (!checkedSession) {
        return _react2.default.createElement(
          "div",
          null,
          "Loading..."
        );
      }

      return _react2.default.createElement(
        "div",
        null,
        this._renderAuth()
      );
    }
  }, {
    key: "_renderAuth",
    value: function _renderAuth() {
      var _props$route$featureF = this.props.route.featureFlagged,
          featureFlagged = _props$route$featureF === undefined ? false : _props$route$featureF;

      return featureFlagged ? this._renderFeatureFlaggedAuth() : this._renderOkta();
    }
  }, {
    key: "_renderFeatureFlaggedAuth",
    value: function _renderFeatureFlaggedAuth() {
      return _react2.default.createElement(_reactLaunchDarkly.FeatureFlag, { flagKey: this.props.route.featureFlagKey,
        renderFeatureCallback: this._renderOkta,
        renderDefaultCallback: this._renderNoAuth });
    }
  }, {
    key: "_renderOkta",
    value: function _renderOkta() {
      return _react2.default.createElement(_OktaLogin2.default, { authenticationUrl: this.props.route.authenticationUrl });
    }
  }, {
    key: "_renderNoAuth",
    value: function _renderNoAuth() {
      return _react2.default.createElement(_NoAuthLogin2.default, { simulateSession: this.props.simulateSession });
    }
  }]);

  return RequireAuth;
}(_react.Component);

exports.default = RequireAuth;