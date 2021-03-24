const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({g
    usernameField: email
},
    function (email, password, done)(){
    // find the user and establish identity
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log("Error in finding user in passport");
            return done(err);
        }
        if (!user || user.password != password) {
            console.log("Invalid username / password");
            return done(null, false);
        }

        return done(null, user);
    });
}
));

// serializing the user to decide which key to be kept on cookie
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

// deserializing the usr from the cookies
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log("Error in finding user in passport");
            return done(err);
        }
    });

    return done(null, user);
});