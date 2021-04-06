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

module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        req.flash('error', "You are already Signed in!");
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

                req.flash('success', 'Successfully registered');
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash('error', "User with same email already exists.")
            return res.redirect('back');
        }
    });
};

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('error', "You are already Signed in!");
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', { title: 'nocial | Sign In' });
};

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
};
// sign out
module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out!');

    return res.redirect('/');
};

module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){ console.log("Multer Error: ", err); return; }

                user.name = req.body;
                user.email = req.body.email;
                
                if(req.file){
                    // Saving file path in user avatar
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');

            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', "Unauthorized Access");
        return res.status('401').send('Unauthorized');
    }
};