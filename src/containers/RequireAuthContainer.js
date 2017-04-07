/* @flow */
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RequireAuth from "../components/RequireAuth";
import { simulateSession } from "../actions/session";

export default connect(
  (state) => ({session: state.session}),
  (dispatch) => bindActionCreators({simulateSession}, dispatch)
)(RequireAuth);
