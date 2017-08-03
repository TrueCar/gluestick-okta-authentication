"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seamlessImmutable = require("seamless-immutable");

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _ActionTypes = require("../constants/ActionTypes");

var _Session = require("../constants/Session");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = (0, _seamlessImmutable2.default)({ status: _Session.sessionStateConstants.LOGGED_OUT, user: null });

//TODO Need to test figure out what happens when someone is not in the Okta group

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.GET_SESSION:
      {
        var _status = _Session.sessionStateConstants.LOGGED_OUT;
        var _user = null;

        var session = action.payload.data.session;

        if (session.user) {
          _status = _Session.sessionStateConstants.LOGGED_IN;
          _user = session.user;
        }
        return (0, _seamlessImmutable2.default)({ status: _status, user: _user });
      }
    default:
      return state;
  }
};