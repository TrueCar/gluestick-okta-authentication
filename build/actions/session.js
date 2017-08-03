"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSessionFromServer = loadSessionFromServer;
exports.simulateSession = simulateSession;

var _ActionTypes = require("../constants/ActionTypes");

function loadSessionFromServer(sessionUrl) {
  return {
    type: _ActionTypes.GET_SESSION,
    promise: function promise(httpClient) {
      return httpClient.get(sessionUrl);
    }
  };
}
function simulateSession() {
  return {
    type: _ActionTypes.GET_SESSION,
    value: {
      data: {
        session: {
          user: {
            email: "noauth@user.com",
            name: "NoAuth User"
          }
        }
      }
    }
  };
}