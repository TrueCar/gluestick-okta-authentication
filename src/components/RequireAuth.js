/* @flow */
import React, { Component } from "react";
import { FeatureFlag } from "react-launch-darkly";
import { sessionStateConstants } from "../constants/Session";
import OktaLogin from "../components/OktaLogin";
import NoAuthLogin from "../components/NoAuthLogin";

import type { sessionState } from "../reducers/session";

type RequireAuthProps = {
  children: ?any,
  loadSessionFromServer: Function,
  route: {
    authenticationUrl: string,
    featureFlagged: boolean,
    featureFlagKey: string,
    sessionUrl: string
  },
  session: sessionState,
  simulateSession: Function
}

export default class RequireAuth extends Component {
  props: RequireAuthProps;
  state: {
    checkedSession: boolean
  };

  constructor(props:RequireAuthProps) {
    super(props);
    this.state = {
      checkedSession: false
    };

    (this:any)._renderOkta = this._renderOkta.bind(this);
    (this:any)._renderNoAuth = this._renderNoAuth.bind(this);
  }

  // $FlowIgnore - Flow componentDidMount wants to return void, but adding async makes it return a Promise
  async componentDidMount() {
    const { sessionUrl } = this.props.route;
    const { loadSessionFromServer, session = {} } = this.props;
    if (session.status !== sessionStateConstants.LOGGED_IN) {
      await loadSessionFromServer(sessionUrl);
      this.setState({checkedSession: true})
    }
  }

  render() {
    const { checkedSession } = this.state;
    const { session = {}, children } = this.props;

    if (session.status === sessionStateConstants.LOGGED_IN) {
      return children;
    }

    if (!checkedSession) {
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
    const { featureFlagged = false } = this.props.route;
    return featureFlagged ? this._renderFeatureFlaggedAuth() : this._renderOkta();
  }

  _renderFeatureFlaggedAuth() {
    return ( <FeatureFlag flagKey={this.props.route.featureFlagKey}
                        renderFeatureCallback={this._renderOkta}
                        renderDefaultCallback={this._renderNoAuth} />);
  }

  _renderOkta() {
    return <OktaLogin authenticationUrl={this.props.route.authenticationUrl} />;
  }

  _renderNoAuth() {
    return <NoAuthLogin simulateSession={this.props.simulateSession} />;
  }
}
