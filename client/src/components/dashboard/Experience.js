import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {
    onDeleteExperience (id) {
        // We are able to pass the this.props.history becuase of withRouter
        this.props.deleteExperience(id)
    }
  render() {
      const experience = this.props.experience.map(experience => (
          <tr key={experience._id}>
            <td>{experience.company}</td>
            <td>{experience.title}</td>
            <td><Moment format="DD/MM/YYYY">{experience.from}</Moment> - 
            {experience.to === null ? ' till date': <Moment format="DD/MM/YYYY"> {experience.to}</Moment>}
            </td>
            <td><button className="btn btn-danger" onClick={this.onDeleteExperience.bind(this, experience._id)}>Delete</button></td>
          </tr>
      ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
            </tr>
            { experience }
        </thead>
        </table>
      </div>
    );
  }
}
Experience.PropTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience)
