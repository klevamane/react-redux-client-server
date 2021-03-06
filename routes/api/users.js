const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLogin = require('../../validation/login');


// load User model
const User = require("../../models/User");
const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    message: "Users works"
  })
);

// @route   POST api/users/register
// @desc    Register a new users
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: 200, // Size
      r: "pg", // rating
      d: "mm" // Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar
    });
    bcrypt.genSalt (10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
      });
    });
  });
});
 
router.post('/login', (req, res) => {
  
    const { errors, isValid } = validateLogin(req.body);
    const { email, password } = req.body;

    // Check validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

    // Find user by email
        User.findOne({email})
            .then((userExist) => {
                if(!userExist) {
                  errors.user = 'User not found';
                  return res.status(404).json(errors);
                } 
                // Check password
                bcrypt.compare(password, userExist.password)
                    .then(isMatch => {
                        if(isMatch) {
                          // User matched

                          const payload = {id: userExist.id, name:  userExist.name, avatar: userExist.avatar};
                          // Sign token
                          jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' },
                             (err, token) => {
                             return res.json({ success: true, token: `Bearer ${token}`});
                          });
                        }  else {
                          errors.password = 'Incorrect password';
                          return res.status(400).json(errors);
                        }
                           
                    });
        
            });

});

// @route   POST api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
