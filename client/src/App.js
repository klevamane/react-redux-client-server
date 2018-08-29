import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import NavbarComponent from './components/layout/Navbar';
import FooterComponent from './components/layout/Footer';
import LandingComponent from './components/layout/Landing';
import RegisterComponent from './components/auth/Register';
import LoginComponent from './components/auth/Login';
import store from './store';

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <NavbarComponent />
       <Route exact path={'/'} component={LandingComponent} />
        <div className="container">
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/login" component={LoginComponent} />
        </div>
        <FooterComponent />
      </div>
      </Router>
    </Provider>
     );
  }
}

export default App;
