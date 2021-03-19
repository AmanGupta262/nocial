const express = require('express');
const app = express();
const port = 8000;

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