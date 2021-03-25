const Post = require('../models/post');

module.exports.createPost = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },
    (err, post) => {
        if(err){ console.log("Error in creaatin post"); return; }

        return res.redirect('back');
    });
};