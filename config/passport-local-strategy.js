const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function (req, email, password, done) {
        // find the user and establish identity
        User.findOne({ email: email }, async (err, user) => {
            if (err) {
                req.flash('error', err);
                return done(err);
            }
            const match = await bcrypt.compare(password, user.password);
            if (!user || !match) {
                req.flash('error', "Invalid username / password");
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
        return done(null, user);
    });

});

passport.checkAuthenticated = (req, res, next) => {
    // if user is signed in, then pass on the req to next action
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;