import React ,{ lazy , Suspense } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as api from './Service/apiHelper'
import Loading from './SubComponents/Loading'
const Auth = lazy(() => import('./Pages/Auth'))
const Home = lazy(() => import('./Pages/Home'))
const isAuthencated = api.isLogin()
const UserLogin = ({ children, ...rest }) => {
    return (
        <Route
        {...rest}
        render={({ location }) =>
        !isAuthencated ? ( children ) : (
            <Redirect to={{
                pathname: "/main",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
}
const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
        {...rest}
        render={({ location }) =>
        isAuthencated ? ( children ) : (
            <Redirect to={{
                pathname: "/Auth",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
}
const Appchat = () => {
    return(
        <Router>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <PrivateRoute path="/main">
                    <Home/>
                    </PrivateRoute>
                    
                    <UserLogin path="/Auth">
                        <Auth/>
                    </UserLogin>
                    
                </Switch>
            </Suspense>
        </Router>

    )
}
export default React.memo(Appchat)