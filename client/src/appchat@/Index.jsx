import React ,{ lazy , Suspense } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as api from './Service/apiHelper'
import Loading from './SubComponents/Loading'
const AuthLogin = lazy(() => import('./Pages/Auth/Login'))
const AuthReg = lazy(() => import('./Pages/Auth/Reg'))
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
                pathname: "/Auth/login",
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
                    
                    <UserLogin path="/Auth/login">
                        <AuthLogin/>
                    </UserLogin>
                    <UserLogin path="/Auth/reg">
                        <AuthReg/>
                    </UserLogin>
                    
                </Switch>
            </Suspense>
        </Router>

    )
}
export default React.memo(Appchat)