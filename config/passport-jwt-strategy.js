const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('').ExtractJWT;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'nocial'
};

passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user){
        if(err){ console.log("Error in finding user in jwt"); return; }

        if(user)
            return done(null, user);
        else
            return done(null, false);
    });
}));