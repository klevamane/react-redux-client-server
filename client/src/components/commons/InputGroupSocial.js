import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroupSocial = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
}) => {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text"><i className={icon}></i></span>
        </div>
    <input value={value} type={type}
     className={classnames("form-control form-control-lg", {"is-invalid": error })}
     placeholder={placeholder} name={name}
     onChange={onChange}
     />
     { error && (<div className="invalid-feedback">{ error }</div>)}
  </div>
  );
};

InputGroupSocial.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,

}

// the default form control if a type isn't passed into it
// should be a text input
InputGroupSocial.defaultProps = {
    type: 'text'
}

// we dont need default type here because this is all we need in this file; its the default
export default InputGroupSocial;
