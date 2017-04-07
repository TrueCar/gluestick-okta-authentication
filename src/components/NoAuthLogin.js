/* @flow */
import { Component } from "react";

type Props = {
  simulateSession: Function
}

export default class NoAuthLogin extends Component {
  props: Props;

  componentDidMount () {
    this.props.simulateSession();
  }

  render () {
    return null;
  }
}
