import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom'; // use withrouter to route from within an action
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  this.onchange =  this.onchange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
// Using the mapStateToProps to access the state method loginUser as props in the component
    this.props.loginUser(userData, this.props.history);
  }

  componentDidMount() {
    // redirect the user to the dashboard
    // if the user is already authenticated and goes to the login page/ component
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }
  
  componentWillReceiveProps(nextProps) {
    
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NEXT>>>>>>>>>>${JSON.stringify(nextProps)}`);
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }



  render() {
    // its going to come as property from the reducer
    // then we will use componentWillrecieveProps to map it back to the state
    // which is why it can be accessed from the state like this
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" value={this.state.email}
                   className={classnames("form-control form-control-lg", {"is-invalid": errors.email })}
                   placeholder="Email Address" name="email"
                   onChange={this.onchange} />
                   { errors.email && (<div className="invalid-feedback">{ errors.email }</div>)}
                </div>
                <div className="form-group">
                  <input type="password"
                   value={this.state.password} className={classnames("form-control form-control-lg", {"is-invalid": errors.password })}
                   placeholder="Password" name="password" 
                   onChange={this.onchange}/>
                   { errors.password && (<div className="invalid-feedback">{ errors.password }</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired, // register user is an action but its also a property
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ loginUser })(withRouter(Login));
