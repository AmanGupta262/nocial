const User = require('../models/user');

module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, (err, user) => {
            if (user) {
                return res.render('profile', {
                    title: 'Profile',
                    user: user
                });
            }
        });
    }
    else
        return res.redirect('/users/sign-in');
};

module.exports.posts = (req, res) => {
    return res.render('posts', { title: 'Posts' });
};

module.exports.signUp = (req, res) => {
    return res.render('user_signup', { title: 'Nocial | Sign Up' });
};

module.exports.create = (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log("Error in finding user in signing up"); return; }

        if (!user) {
            User.create(req.body, (err, usr) => {
                if (err) { console.log("Error in creating user in signing up"); return; }

                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });
};

module.exports.signIn = (req, res) => {
    return res.render('user_signin', { title: 'Nocial | Sign In' });
};

module.exports.createSession = (req, res) => {
    // find the user
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log("Error in finding user"); return; }

        // handle user found
        if (user) {
            // handle password which don't match
            if (user.password != req.body.password)
                return res.redirect('back');

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else {
            // handle user not found
            return res.redirect('back');
        }

    });
};
module.exports.signOut = (req, res) => {
    res.clearCookie('user_id');
    return res.redirect('back');
};