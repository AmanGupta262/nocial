const Post = require('../models/post')
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

        return res.render('home', {
            title: "Home",
            posts: posts,
            timeago: timeago
        });
    });
};

//module.exports.actionName = (req, res) => {}