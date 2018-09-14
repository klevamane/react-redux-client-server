import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import TextFieldGroup  from '../commons/TextFieldGroup';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';
import PropTypes from 'prop-types';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
        
    }
    onSubmit(e) {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        // we are able to use thr this.props.history because we imported withRouther
        // and enclosed our component in it
        // check the connect method down below for more details

        // we are also able to access the addExperience method because
        // we imported it here and mapped the state to props

        // check the addExperience function in the profile action to see that it takes 2 parameters
        this.props.addExperience(expData, this.props.history);
    }
    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }
   onCheck(e) {
       // toggle options based on whether the checkbox is checked or not
       this.setState({
           disabled: !this.state.disabled,
           current: !this.state.current
       });
   }
// set errors if it occurs 
   componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        })
    }
}
  render() {
      const { errors } = this.state;
    return (
    <div className="add-experience">
    <div className="container">
    <div className="row">
    <div className="col-md-8 m-auto">
        <Link to="/dashboard" className="btn btn-light">Go back</Link>
        <h1 className="display-4 text-center">Add Experience</h1>
        <p className="lead text-center">Add any job or position you have had in the past ot current</p>
        <small className="d-block pb-3">* = required fields</small>
        <form onSubmit={this.onSubmit}>
        <TextFieldGroup
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                />
        
        <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}

                />

         <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                />
        <h6>From Date</h6>
         <TextFieldGroup
                    placeholder="From date"
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                />

        <h6>To Date</h6>
         <TextFieldGroup
                    placeholder="To date"
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? 'disabled': ''} // if disabled in the state = true then disable else '
                />
        <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" 
            name="current" 
            value={this.state.current}
            checked={this.state.current}
            onChange={this.onCheck}
            id="current"
            />
            <label htmlFor="current" className="form-check-label">
            Current Job
            </label>

         <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about the position"

                />
            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
        </div>
        </form>
    </div>
    </div>
    </div>
    
  </div>
  )
  }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
    
});

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}


export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
