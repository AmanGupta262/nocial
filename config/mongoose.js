const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nocial_development',  { useNewUrlParser: true, useUnifiedTopology: true, });

const db = mongoose.connection;

db.on('error', console.error.bind("Error in connecting to mongodb"));

db.once('open', () => {
    console.log("Connected to database : MongoDB");
});

module.exports = db