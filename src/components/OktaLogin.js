/* @flow */
import React, { Component } from "react";

type OktaLoginProps = {
  authenticationUrl: string
}

export default class OktaLogin extends Component {
  props: OktaLoginProps;

  oktaForm:Object;
  callbackInput:Object;

  componentDidMount() {
    this.callbackInput.value = window.location.href;
    this.oktaForm.submit();
  }

  render() {
    return (
      <form action={`${this.props.authenticationUrl}`}
            style={{display: "none"}}
            ref={el => this.oktaForm = el}
            className="panel panel-default"
            method="post">
        <input type="hidden"
               ref={el => this.callbackInput = el}
               name="callback_url"/>
      </form>
    );
  }
}
