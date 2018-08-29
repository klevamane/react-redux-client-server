const Validator = require('Validator');
const isEmpty = require('./exports');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    // Data.name may be empty but may not be a string
    // we need to ensure that if its empty (using our custom IsEmpty method to check)
    // we make it an empty string which can now be checked by the validator.isEmpty method
    // The reason being that validator.isEmpty can only check for empty string not empty object
    data.title = isEmpty(data.title) === true ? '': data.title;
    data.company = isEmpty(data.company) === true ? '': data.company;
    data.from = isEmpty(data.from) === true ? '': data.from;
    
    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title field is required';
    }
    
    if(Validator.isEmpty(data.company)){
        errors.company = 'Company field is required';
    }
    
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
