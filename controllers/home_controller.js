const Post = require('../models/post')
const User = require('../models/user')
const timeago = require('timeago.js');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({}).populate('user').sort('-createdAt')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});

        return res.render('home', {
            title: "nocial | Home",
            posts: posts,
            all_users: users,
            timeago: timeago
        });
    } catch (e) {
        console.log("Error ", e);
        return;
    }

};

//module.exports.actionName = (req, res) => {}