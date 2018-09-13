import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import NavbarComponent from "./components/layout/Navbar";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import FooterComponent from "./components/layout/Footer";
import LandingComponent from "./components/layout/Landing";
import RegisterComponent from "./components/auth/Register";
import LoginComponent from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import store from "./store";
import { clearCurrentProfile } from "./actions/profileActions";

import PrivateRoute from "./components/commons/privateRoute";
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";


// Check for token in local storage
// This is to ensure that a user stays logged In
if (localStorage.jwtToken) {
  // set the Authentication Header with the token in local storage to enable steady access
  setAuthToken(localStorage.jwtToken);
  // Decode the token and get user info and expiry
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000; //millisecons
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear the current profile upon user logout ot time expiry
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavbarComponent />
            <Route exact path={"/"} component={LandingComponent} />
            <div className="container">
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              </Switch>
            </div>
            <FooterComponent />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
