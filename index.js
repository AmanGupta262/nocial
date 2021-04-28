const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const env = require('./config/environment');
const path = require('path');

// used for authentication cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

// flash message
const flash =  require('connect-flash');
// middleware to store flash messages
const customMware = require('./config/middleware');

// setup chat server to use with sockets.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

// layouts
app.use(expressLayouts);

// Sass
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// Html parser
app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

//static files
app.use(express.static(path.join(__dirname, env.asset_path)));

// make uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// set styles and scripts for sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use MongoStore to store cookie in mongodb
app.use(session({
    name : 'nocial',
    secret : env.session_cookie_key,
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

// use flash
app.use(flash());
app.use(customMware.setFlash);

// use router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }
    console.log(`Server is running on port ; ${port}`);
});