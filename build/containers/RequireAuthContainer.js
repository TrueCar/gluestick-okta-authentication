"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _RequireAuth = require("../components/RequireAuth");

var _RequireAuth2 = _interopRequireDefault(_RequireAuth);

var _session = require("../actions/session");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
  return { session: state.session };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({ loadSessionFromServer: _session.loadSessionFromServer, simulateSession: _session.simulateSession }, dispatch);
})(_RequireAuth2.default);