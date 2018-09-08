import React from 'react'
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
    <div className="form-group">
    <input type={type} value={this.state.email}
     className={classnames("form-control form-control-lg", {"is-invalid": error })}
     placeholder={placeholder} name={name}
     onChange={onChange}
     disabled={disabled} />
     {info && <small className="form-text text-muted">{info}</small>}
     { error && (<div className="invalid-feedback">{ errors }</div>)}
  </div>
  );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,

}
// the default form control if a type isn't passed into it
// should be a text input
TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
