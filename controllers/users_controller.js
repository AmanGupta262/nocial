const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('../config/nodemailer');
const { unuse } = require('passport');

const Friendship = require('../models/friendship');

module.exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        await user.populate('friends');
        
        console.log(user);

        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
        
    } catch (e) {
        console.log(e);
        req.flash('error', e);
        return res.redirect('back');
    }    
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
            User.create(req.body, async (err, user) => {
                if(err){ console.log("Error in creating user in signing up"); return; }

                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(user.password, salt);
                user.save();

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

                user.name = req.body.name;
                user.email = req.body.email;
                
                if(req.file){
                    if (user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar)))
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));

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

module.exports.forgotPassword = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('error', "You are already Signed in!");
        return res.redirect('back');
    }
    return res.render('user_reset_password', { title: 'nocial | Forgot Password' });
}

module.exports.resetPassword = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            req.flash('error', "You are already Signed in!");
            return res.redirect('back');
        }
        const resetToken = req.params.token;
        if(resetToken){
            return res.render('user_new_password', { title: 'nocial | Change Password', token: resetToken });
        }
        const token = crypto.randomBytes(32).toString('hex');
        const user = await User.findOne({email: req.body.email});
        user.resetToken = token;
        user.expireToken = Date.now() + 600000;
        await user.save();

        nodemailer.transporter.sendMail({
            to: req.body.email,
            from: "no-reply@nocial.com",
            subject: "Reset Password",
            html: `<h5>Click <a href="http://localhost:8000/users/reset-password/${token}">here</a> to create new password</h5>`
        },(err, info) => {
            if(err) { console.log('Error in sending mail: ', err); return; }

        console.log("Message Sent");
            return;
        });
        req.flash('success', "Link sent");
        return res.redirect('back');

    } catch (e) {
        console.log(e);
        req.flash('error', e);
        return res.redirect('back');
    }
}

module.exports.newPassword = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            req.flash('error', "You are already Signed in!");
            return res.redirect('back');
        }
        const token = req.body.token;
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;

        if (password != confirmPassword) {
            req.flash('error', "Enter same password");
            return res.redirect('back');
        }

        const user = await User.findOne({ resetToken: token });
        if(user.expireToken > Date.now()){
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            user.save();

            user.resetToken = '';
            user.expireToken = Date.now();
            req.flash('success', "Password Updated");
            return res.redirect('/users/sign-in');
        }
        req.flash('error', "Session Expired");
        return res.redirect('/users/forgot-password');

    } catch (e) {
        console.log(e);
        req.flash('error', e);
        return res.redirect('back');
    }
};