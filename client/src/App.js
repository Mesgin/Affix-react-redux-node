import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { clearCurrentProfile } from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'



if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile)
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className="container">
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
