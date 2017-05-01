/* @flow */
import { Component } from "react";

type NoAuthProps = {
  simulateSession: Function
}

export default class NoAuthLogin extends Component {
  props: NoAuthProps;

  componentDidMount() {
    this.props.simulateSession();
  }

  render() {
    return null;
  }
}
