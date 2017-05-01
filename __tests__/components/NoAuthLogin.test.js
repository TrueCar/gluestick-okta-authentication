import NoAuthLogin from "../../src/components/NoAuthLogin";
import { shallow, mount } from "enzyme";
import React from "react";

describe("components/NoAuthLogin", () => {
  it("renders without issues", () => {
    const simulationSessionMock = jest.fn();
    const subject = <NoAuthLogin simulateSession={simulationSessionMock} />;
    const wrapper = shallow(subject);
    expect(wrapper.node).toBeNull();
  });

  it("calls simulateSession on componentDidMount", () => {
    const simulationSessionMock = jest.fn();
    mount(<NoAuthLogin simulateSession={simulationSessionMock} />);
    expect(simulationSessionMock.mock.calls.length).toBe(1);
  });
});