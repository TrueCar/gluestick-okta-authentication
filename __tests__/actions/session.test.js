import { simulateSession, loadSessionFromServer } from "../../src/actions/session";
import { GET_SESSION } from "../../src/constants/ActionTypes";

describe("actions/session.js", () => {
  describe("simulateSession", () => {
    it("returns the simulated session data", () => {
      const expected = {
        type: GET_SESSION,
        value: {
          data: {
            session: {
              user: {
                email: "noauth@user.com",
                name: "NoAuth User"
              }
            }
          }
        }
      };
      const action = simulateSession();
      expect(action).toEqual(expected)
    });
  });

  describe("loadSessionFromServer", () => {
    it("creates an action to get the session data", () => {
      const { type, promise } = loadSessionFromServer();
      expect(type).toEqual(GET_SESSION);
      expect(typeof promise).toBe("function");
    });
  });
});
