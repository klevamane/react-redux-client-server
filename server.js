const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const  profile = require('./routes/api/profile');

require('dotenv').config()

const app = express();

// DB config
const db = process.env.DBCONNECT_STRNING;

// connect to mongoDB
mongoose.connect(db).then(() => winston.info('Database connected'))
    .catch(err => winston.info(err));

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('combined'))

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)

// Passport config
app.get('/', (req, res) => res.send('Hello'));
// user routes

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = 4000 || process.env.NODE_ENV;
console.log({db});
app.listen(port, () => console.log(`Server is running on port ${port}`));
