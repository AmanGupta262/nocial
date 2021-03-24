const User = require('../models/user');

module.exports.profile = (req, res) => {
    return res.render('profile', {title: 'Profile'});
};

module.exports.posts = (req, res) => {

    return res.render('posts', { title: 'Posts' });
};

module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', { title: 'Nocial | Sign Up' });
};

module.exports.create = (req, res) => {
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email} , (err, user) => {
        if(err){ console.log("Error in finding user in signing up"); return;}

        if(!user){
            User.create(req.body, (err, usr) => {
                if(err){ console.log("Error in creating user in signing up"); return; }

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
};

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', { title: 'Nocial | Sign In' });
};

module.exports.createSession = (req, res) => {
    return res.redirect('/');
};