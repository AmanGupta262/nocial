const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = function (req, res) {
    Post.find({}).populate('user').exec((err, posts) => {
        if (err) { console.log("Error in finding posts"); return; }

        return res.render('home', {
            title: "Home",
            posts: posts
        });
    });
};

//module.exports.actionName = (req, res) => {}