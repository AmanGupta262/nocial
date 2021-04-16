const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.addComment = async (req, res) => {
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                            content: req.body.content,
                            post: req.body.post,
                            user: req.user._id
                        });
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);

            if(req.xhr){

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
            
            req.flash('success', "Comment added successfully");
            return res.redirect('back');
        }
    }catch(e){
        req.flash('error', e);
        return res.redirect('back');
    }    
};

module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted"
                });
            }

            req.flash('success', "Comment deleted successfully");
        }
        return res.redirect('back');

    } catch (e) {
        req.flash('error', e);
        return res.redirect('back');
    }
};