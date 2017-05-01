import OktaLogin from "../../src/components/OktaLogin";
import React from "react";
import renderer from 'react-test-renderer';

describe("components/OktaLogin", () => {
  describe("snapshot tests", () => {
    function createNodeMock(element) {
      if (element.type === 'callbackInput') {
        return {
          value: 'test/callbackUrl'
        };
      }
      return null;
    }

    it("renders the form", () => {
      const options = {createNodeMock};
      const oktaLogin = renderer.create(<OktaLogin authenticationUrl="test/url"/>, options);
      let tree = oktaLogin.toJSON();
      expect(tree).toMatchSnapshot();
    })
  });
});