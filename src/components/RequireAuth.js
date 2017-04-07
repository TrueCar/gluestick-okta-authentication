/* @flow */
import React, { Component } from "react";
import { loadSessionFromServer } from "../actions/session";
import { FeatureFlag } from "react-launch-darkly";
import { sessionStateConstants } from "../constants/Session";
import OktaLogin from "../components/OktaLogin";
import NoAuthLogin from "../components/NoAuthLogin";

import type { sessionState } from "../reducers/session";

type Props = {
  authenticationUrl: string,
  children: ?any,
  featureFlagged: boolean,
  featureFlagKey: string,
  session: sessionState,
  sessionUrl: string,
  simulateSession: Function
}

export default class RequireAuth extends Component {
  props: Props;
  state: {
    mounted: boolean
  };

  constructor (props:Props) {
    super(props);
    this.state = {
      mounted: false
    };

    (this:any)._renderOkta = this._renderOkta.bind(this);
    (this:any)._renderNoAuth = this._renderNoAuth.bind(this);
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  static gsBeforeRoute({dispatch, getState}) {
    // const { session } = getState();
    // if (session.status !== sessionStateConstants.LOGGED_IN) {
    //   //TODO How do we get this? Environment variable? I don't like that
    //
    // }
    return dispatch(loadSessionFromServer("http://localhost:8888/api/auth/session.json"));
  }

  render() {
    const { mounted } = this.state;
    const { session, children } = this.props;

    if (session.status === "LOGGED_IN") {
      return children;
    }

    if (!mounted) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        {this._renderAuth()}
      </div>
    );
  }

  _renderAuth() {
    const { featureFlagged = false } = this.props;
    return featureFlagged ? this._renderFeatureFlaggedAuth() : this._renderOkta();
  }

  _renderFeatureFlaggedAuth() {
    return ( <FeatureFlag flagKey={this.props.featureFlagKey}
                        renderFeatureCallback={this._renderOkta}
                        renderDefaultCallback={this._renderNoAuth} />);
  }

  _renderOkta() {
    return <OktaLogin authenticationUrl={this.props.authenticationUrl} />;
  }

  _renderNoAuth() {
    return <NoAuthLogin simulateSession={this.props.simulateSession} />;
  }
}
