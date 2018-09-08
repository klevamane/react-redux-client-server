import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile }from '../../actions/profileActions';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h3>Dashboad</h3>
        <h3>Dashboad</h3>
        <h3>Dashboad</h3>
      </div>
    );
  }
}



export default connect(null, { getCurrentProfile })(Dashboard);
