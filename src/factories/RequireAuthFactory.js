/* @flow */
import React from "react";
import RequireAuthContainer from "../containers/RequireAuthContainer";

export default function RequireAuthWrapper(settings) {
    const wrapper = (props => <RequireAuthContainer {...props} {...settings} />);
    wrapper.gsBeforeRoute = RequireAuthContainer.gsBeforeRoute;
    return wrapper;
}
