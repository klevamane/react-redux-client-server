import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../commons/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';
import InputGroupSocial from '../commons/InputGroupSocial';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {} // this will be set by the reducer's mapState to props that is being passed to the constructor 


        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram

        }
        // When ever we call a redux action remember that it's always in the props
        // becuase the action has been attached to the component via the connect
        // this.props.histor - the component in connect has to be wrapped with withRouter from react-router-dom
        this.props.createProfile(profileData, this.props.history)
    };

    onChange(e) {
        e.preventDefault();

        // This enables the text we type to show ing the text box or input component
        this.setState({ [e.target.name]: e.target.value });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
  render() {
      // this will be gotten from the component state object
      const {errors, displaySocialInputs} = this.state;
      let socialInputs;
      if(displaySocialInputs) {
          socialInputs = (
              <div>
                  <InputGroupSocial
                    placeholder="Twitter Profile Url"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    />

                    <InputGroupSocial
                    placeholder="Facebook Profile Url"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    />

                    <InputGroupSocial
                    placeholder="Linkedin Profile Url"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    />

                    <InputGroupSocial
                    placeholder="Youtube Profile Url"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    />

                    <InputGroupSocial
                    placeholder="Instagram Profile Url"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    />
              </div>
          )
      }
      // Select options for status
      const options = [
        {label: '* Select Professional Status', value: 0 },
        {label: 'Developer', value: 'Developer' },
        {label: 'Junior Developer', value: 'Junior Developer' },
        {label: 'Senior Developer', value: 'Senior Developer' },
        {label: 'Manager', value: 'Manager' },
        {label: 'Learning Facilitator', value: 'Learning Facilitator' },
        {label: 'Intern', value: 'Intern' },
        {label: 'Other', value: 'Other' },
      ];
    return (
      <div className="create-profile">
      <div className="container">
          <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create your profile</h1>
            <p className="lead text-center">Lets get some information to make your profile</p>
            <small className="d-block pb-3">* required field</small>
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    placeholder="* Profile handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="A unique handle for your profile URL"

                />

                  <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                 <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Could be your own company or the one you work for"

                />

                 <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Could be your own or your company website"

                />

                 <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City & State"

                />

                 <TextFieldGroup
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma seperated values (eg. HTML,CSS,PHP)"

                />

                 <TextFieldGroup
                    placeholder="Github"
                    name="github"
                    value={this.state.github}
                    onChange={this.onChange}
                    error={errors.github}
                    info="Include your github username to get your latest repos"

                />

                 <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="A short story about yourself"

                />

                <div className="mb-3">
                    <button className="btn btn-light" type="button" onClick={() => {
                        this.setState(previousState => ({
                            // it'll basically toggle the state ie displaysocialinputs
                            displaySocialInputs: !previousState.displaySocialInputs
                        }))
                    }}>Add Social Network Links</button>
                    <span className="text-muted">Optional</span>
                </div>
                    {socialInputs}
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {createProfile })(withRouter(CreateProfile));
