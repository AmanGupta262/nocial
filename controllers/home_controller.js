const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
const Comment = require('../models/comment');
const timeago = require('timeago.js');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                model: Comment,
                populate: [
                    {
                        path: 'user',
                        select: 'name',
                        model: User
                    },
                    {
                        path: 'likes',
                        model: Like
                    }
                ]
            })
            .populate('likes')
            .sort('-createdAt');
            
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