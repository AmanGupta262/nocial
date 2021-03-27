const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = (req, res) => {
    Post.findById(req.body.post, (err, post) => {
        if(err){ console.log("Error in finding post"); return; }

        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        },
        (err, comment) => {
            post.comments.push(comment);
            post.save();

            res.redirect('back');
        });
    });
    
};