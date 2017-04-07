/* @flow */
import Immutable from "seamless-immutable";
import { GET_SESSION } from "../constants/ActionTypes";
import { sessionStateConstants } from "../constants/Session";

type User = {
  email: string,
  name: string
}

export type sessionState = {
  status: string,
  user: ?User,
}

const INITIAL_STATE: sessionState = Immutable({status: sessionStateConstants.LOGGED_OUT, user: null});

export default (state: Object = INITIAL_STATE, action: Object): Object => {
  switch (action.type) {
    case GET_SESSION: {
      let status = sessionStateConstants.LOGGED_OUT;
      let user = null;

      const { session } = action.value;
      if (session.user) {
        status = sessionStateConstants.LOGGED_IN;
        user = session.user;
      }
      return Immutable({status: status, user: user});
    }
    default:
      return state;
  }
};
