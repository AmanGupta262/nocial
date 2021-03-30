const Post = require('../models/post')
const User = require('../models/user')
const timeago = require('timeago.js');

module.exports.home = function (req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err, posts) => {
        if (err) { console.log("Error in finding posts"); return; }

        User.find({}, (err, users) => {
            if (err) { console.log("Error in finding users"); return; }

            return res.render('home', {
                title: "nocial | Home",
                posts: posts,
                all_users: users,
                timeago: timeago
            });
        });
    });
};

//module.exports.actionName = (req, res) => {}