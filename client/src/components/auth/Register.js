import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // connect is used to connect a react compoent to redux
import { registeruser } from '../../actions/authActions'; // register user action

class Register extends Component {
    constructor() {
        super();
            this.state = {
                name: '',
                email: '',
                password: '',
                password2: '',
                errors: {}
            };
            // alternatively we wouldn't put this in the constructor
            // we would just use this.onChange.bind(this) as every oncChange method
            // passed to each form control instead of this.onChange
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name] : e.target.value} );
    };

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registeruser(newUser)
        
    // axios.post('/api/users/register', newUser) // remember that we have a proxyscript implicitly adding the httplocalhos:3000
    //     .then((response) => {
    //         console.log(response.data);
    //         // set the errors object to recieve errors
    //         // remember set state makes the dom reload the component part / component
    //     }).catch(err => this.setState({ errors: err.response.data }));
    }
  render() {
    const {errors} = this.state;
    const { user } = this.props.auth;
    return (
        <div className ="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" className={classnames("form-control form-control-lg", {"is-invalid": errors.name })} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>

                <div className="form-group">
                  <input type="email" value={this.state.email} onChange={this.onChange} className={classnames("form-control form-control-lg", {"is-invalid": errors.email })} placeholder="Email Address" name="email" />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>

                <div className="form-group">
                  <input type="password" value={this.state.password} onChange={this.onChange} className={classnames("form-control form-control-lg", {"is-invalid": errors.password })} placeholder="Password" name="password" />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>

                <div className="form-group">
                  <input type="password" value={this.state.password2} onChange={this.onChange} className={classnames("form-control form-control-lg", {"is-invalid": errors.password2 })} placeholder="Confirm Password" name="password2" />
                  {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
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

Register.propTypes = {
  registeruser: PropTypes.func.isRequired, // register user is an action but its also a property
  auth: PropTypes.object.isRequired 
}

// in order to use the state in the component
const mapStateToProps =(state) => ({
  auth: state.auth // This state.auth comes from the root reducer ie the index.js in the reducer folder
});

// because we now want to connect our component to redux we, we have to now use the connect() function
// export default Register;
// Using the connect func

// The first parameter is usually null, but if a mapStateToProps exist then it should be placed there
// The second parameter is an object where we can map our actions
export default connect(mapStateToProps, { registeruser })(Register);

// instead of exporting just the componenet as when it was created,
// because we are using connect this is how it will be
// since we are also maping state to props then this is how it will be

// mapStateToProps has to be the first parameter in the connect method in order to access the state as props in 
// the component, and it depends on which state reducer stuff
