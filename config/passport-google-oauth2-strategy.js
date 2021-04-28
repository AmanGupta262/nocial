const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const env = require('./environment');

passport.use(new googleStrategy({
        clientID: env.google_oauth_client_id,
        clientSecret: env.google_oauth_client_secret,
        callbackURL: env.google_oauth_callback_url
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google oauth2 passport: ", err);
                return;
            }
            console.log(profile);

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