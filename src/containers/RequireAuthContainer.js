/* @flow */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RequireAuth from "../components/RequireAuth";
import { loadSessionFromServer, simulateSession } from "../actions/session";

export default connect(
  (state) => ({session: state.session}),
  (dispatch) => bindActionCreators({loadSessionFromServer, simulateSession}, dispatch)
)(RequireAuth);
