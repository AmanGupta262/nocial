const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
        clientID: "684822505834-037oqhpm9se06vqk58g9pfn7sedqfibr.apps.googleusercontent.com",
        clientSecret: "QZcEzdcHa0IJ9nAeQqblpn98",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google oauth2 passport: ", err);
                return;
            }
            if(user){
                return done(null, user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                },function(err, user){
                    if (err) {
                        console.log("Error in creating user google oauth2 passport: ", err);
                        return;
                    }
                    else {
                        return done(null, user);
                    }
                });
            }
        });
    }
));

module.exports = passport;