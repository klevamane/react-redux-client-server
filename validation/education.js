const Validator = require('Validator');
const isEmpty = require('./exports');

module.exports = function validateEducationInput(data) {
    let errors = {};

    // Data.name may be empty but may not be a string
    // we need to ensure that if its empty (using our custom IsEmpty method to check)
    // we make it an empty string which can now be checked by the validator.isEmpty method
    // The reason being that validator.isEmpty can only check for empty string not empty object
    data.school = isEmpty(data.school) === true ? '': data.school;
    data.degree = isEmpty(data.degree) === true ? '': data.degree;
    data.fieldofstudy = isEmpty(data.fieldofstudy) === true ? '': data.fieldofstudy;
    data.from = isEmpty(data.from) === true ? '': data.from;
    
    if(Validator.isEmpty(data.school)){
        errors.school = 'School field is required';
    }
    
    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Degree field is required';
    }

    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = 'Field of study is required';
    }
    
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
