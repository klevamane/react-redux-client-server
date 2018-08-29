const Validator = require('Validator');
const isEmpty = require('./exports');

module.exports = function validateProfileInput(data) {
    let errors = {};

    // Data.name may be empty but may not be a string
    // we need to ensure that if its empty (using our custom IsEmpty method to check)
    // we make it an empty string which can now be checked by the validator.isEmpty method
    // The reason being that validator.isEmpty can only check for empty string not empty object
    data.handle = isEmpty(data.handle) === true ? '': data.handle;
    data.skills = isEmpty(data.skills) === true ? '': data.skills;
    data.status = isEmpty(data.status) === true ? '': data.status;

    console.log(data.password);
    
    if(!Validator.isLength(data.handle, {min: 2, max: 30})) {
        errors.handle = 'Handle must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills is required';
    }

    // These can be empty, but if its not empty, then validate it
    if(!isEmpty(data.website)){
       if(!Validator.isURL(data.website)) {
           errors.website = 'Not a valid URL'
       }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
     }

     if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)) { 
            errors.twitter = 'Not a valid URL'
        }
     }
     
     if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
     }
     
     if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL'
        }
     }

     if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
     }
   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
