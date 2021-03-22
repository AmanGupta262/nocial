const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


// layouts
app.use(expressLayouts);

// Html parser
app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

//static files
app.use(express.static('./assets'));

// set styles and scripts for sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use router
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }
    console.log(`Server is running on port ; ${port}`);
});