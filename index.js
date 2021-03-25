const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for authentication cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

// layouts
app.use(expressLayouts);

// Sass
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// Html parser
app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

//static files
app.use(express.static('./assets'));

// set styles and scripts for sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use MongoStore to store cookie in mongodb
app.use(session({
    name : 'nocial',
    secret : 'fjdsfdjk',
    saveUninitialized : false,
    resave : false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create({
        mongoUrl: 'mongodb://localhost/nocial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }
    console.log(`Server is running on port ; ${port}`);
});