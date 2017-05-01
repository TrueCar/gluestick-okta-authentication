/* @flow */
import { GET_SESSION } from "../constants/ActionTypes";

export function loadSessionFromServer(sessionUrl:string):Object {
  return {
    type: GET_SESSION,
    promise: (httpClient:any) => httpClient.get(sessionUrl)
  };
}

export function simulateSession():Object {
  return {
    type: GET_SESSION,
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
