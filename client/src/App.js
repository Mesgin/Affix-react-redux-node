import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import { BrowserRouter, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import './App.css'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser())
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
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
