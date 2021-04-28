const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`,  { useNewUrlParser: true, useUnifiedTopology: true, });

const db = mongoose.connection;

db.on('error', console.error.bind("Error in connecting to mongodb"));

db.once('open', () => {
    console.log("Connected to database : MongoDB");
});

module.exports = db