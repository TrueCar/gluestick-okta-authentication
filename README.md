gluestick-okta-authentication
=======

Simple Okta integration for [Gluestick](https://github.com/TrueCar/gluestick) applications 

### Setup

This is a WIP yo!
Add the wrapper, setup your urls, determine if you want feature flagging via LD (if false, Okta auth always occurs), and pass your LD key

```js
//config/routes.js
import { RequireAuthWrapper } from "gluestick-okta-authentication";

export default function routes() {
  const AuthWrapper = RequireAuthWrapper({
    authenticationUrl: `${apiUrl}/auth/session`,
    sessionUrl: `${apiUrl}/auth/session`,
    featureFlagged: false,
    featureFlagKey: "authentication-required"
  });
  return (
    <Route name="app" path="/" component={App}>
      <Route component={AuthWrapper}>
        <IndexRoute name="root" component={HomePage}/>
      </Route>
      <Route name={ROUTE_NAME_404_NOT_FOUND} path="*" component={NoMatchApp}/>
    </Route>
  );
}
  
```