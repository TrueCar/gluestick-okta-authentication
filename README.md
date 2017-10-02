gluestick-okta-authentication
=======

Simple Okta integration for [Gluestick](https://github.com/TrueCar/gluestick) applications 

### Setup

Reference a [release](https://github.com/TrueCar/gluestick-okta-authentication/releases) in your `package.json` and `npm install`.
* `"gluestick-okta-authentication": "https://github.com/TrueCar/gluestick-okta-authentication/tarball/0.0.1"`

Configuring the authentication is done in the routes. Place the `RequireAuthContainer` in a route around all routes that you want to require authentication for.

The params are
* authenticationUrl: POST to this url to create a new session
* sessionUrl: GET this url to check if the user is logged in or not
* featureFlagged: Defaults to false, however if true, renders a LaunchDarkly component so that the authentication can be toggled on or off via a feature flag.
* featureFlagKey: The key name for handling authentication.

```js
//config/routes.js
import { RequireAuthContainer } from "gluestick-okta-authentication";

export default function routes() {
  return (
    <Route name="app" path="/" component={App}>
      <Route
        component={RequireAuthContainer}
        authenticationUrl={`${apiUrl}/auth/session`}
        sessionUrl={`${apiUrl}/auth/session.json`}
        featureFlagged={true}
        featureFlagKey="authentication-required"
      >
        <IndexRoute name="root" component={HomePage}/>
      </Route>
      <Route name={ROUTE_NAME_404_NOT_FOUND} path="*" component={NoMatchApp}/>
    </Route>
  );
}
```

You'll also need to export the session reducer from `gluestick-okta-authentication` otherwise `RequireAuthContainer` won't be updated and will keep trying to log you in.

```js
//reducers/index.js
import { session } from "gluestick-okta-authentication";

export default {
  session
};
```

This will also make the user information and logged in status available to the rest of your app via `state.session.user` and `state.session.status`.

The contents of the user variable are based on whatever is returned from your app's sessionUrl. The required structure for the response is `{ "session": { "user": {} } }`, so it should look something like this:
```json
{
  "session": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "jdoe@truecar.com",
      "groups": ["Everyone"]
    }
  }
}
```

The options for status are `"LOGGED_IN"` or `"LOGGED_OUT"`.
