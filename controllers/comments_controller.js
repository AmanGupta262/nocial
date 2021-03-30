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

module.exports.destroy = (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) { console.log("Error in finding comment"); return; }
        
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, (err, post) => {
                if (err) { console.log("Error in finding post"); return; }
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
};