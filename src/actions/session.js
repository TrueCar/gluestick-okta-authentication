/* @flow */
import { GET_SESSION } from "../constants/ActionTypes";

export function loadSessionFromServer(sessionUrl:string):Object {
  return {
    type: GET_SESSION,
    promise: (httpClient) => httpClient.get(sessionUrl).then((response) => response.data)
  };
}

export function simulateSession():Object {
  return {
    type: GET_SESSION,
    value: {
      session: {
        user: {
          email: "noauth@user.com",
          name: "NoAuth User"
        }
      }
    }
  };
}
