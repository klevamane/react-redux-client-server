import React, { Component } from 'react'

export default class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    };
  this.onchange =  this.onchange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    alert(this.state.email);
  }
  render() {
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
                   className="form-control form-control-lg" 
                   placeholder="Email Address" name="email"
                   onChange={this.onchange} />
                </div>
                <div className="form-group">
                  <input type="password"
                   value={this.state.password} className="form-control form-control-lg"
                   placeholder="Password" name="password" 
                   onChange={this.onchange}/>
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
