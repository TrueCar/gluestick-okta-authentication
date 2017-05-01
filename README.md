gluestick-okta-authentication
=======

Simple Okta integration for [Gluestick](https://github.com/TrueCar/gluestick) applications 

### Setup

Configuring the authentication is done in the routes. Place the `RequireAuthContainer` in a route above all routes that you want to require authentication for.

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