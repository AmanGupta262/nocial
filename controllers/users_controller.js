const User = require('../models/user');

module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) { console.log("Error in finding user"); return; }

        return res.render('profile', {
             title: 'Profile',
             profile_user: user 
        });
    });
    
};

module.exports.posts = (req, res) => {

    return res.render('posts', { title: 'Posts' });
};

module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', { title: 'nocial | Sign Up' });
};

module.exports.create = (req, res) => {
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email} , (err, user) => {
        if(err){ console.log("Error in finding user in signing up"); return;}

        if(!user){
            User.create(req.body, (err, user) => {
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
    return res.render('user_signin', { title: 'nocial | Sign In' });
};

module.exports.createSession = (req, res) => {
    return res.redirect('/');
};
// sign out
module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
};