import RequireAuthContainer from "../../src/containers/RequireAuthContainer";
import RequireAuth from "../../src/components/RequireAuth";
import { shallow } from "enzyme";
import React from "react";
import { combineReducers, createStore } from "redux";
import sessionReducer from "../../src/reducers/session";

describe("containers/RequireAuthContainer", () => {
  let rendered;
  const store = createStore(combineReducers([sessionReducer]));

  it("renders without an issue", () => {
    rendered = shallow(<RequireAuthContainer store={store}/>);
    expect(rendered).toBeDefined();
  });

  it("renders as a RequireAuth component", () => {
    rendered = shallow(<RequireAuthContainer store={store}/>);
    expect(rendered.is(RequireAuth)).toBeTruthy();
  });
});