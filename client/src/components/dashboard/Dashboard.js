import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount }from '../../actions/profileActions';
import ProfileActions from './ProfileActions'
import {Link} from 'react-router-dom';
import Spinner from '../commons/spinner';

class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();

  }
  render() {
    const { loading, profile } = this.props.profile; 
    const { user } = this.props.auth;
    let dashboardContent;
    

    if (loading || profile === null) {
      dashboardContent = <Spinner />
    }
    else {
      // Check if logged in user has a profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
        
        <div> 
          <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link> </p>
         <ProfileActions />
         {/* TODO: exp and education*/}
         <div style={{marginBottom: '60px'}}></div>
         <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>Delete My Account</button>
        </div>
        )
      } else {
        // User is loggedIn but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You haven't yet setup a profile kindly do that now</p>
            <Link to="create-profile" className="btn btn-lg btn-info"> Create profile</Link>
          </div>
        );
      }
     // dashboardContent = <h4> Successfully Loaded </h4>
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboad</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
