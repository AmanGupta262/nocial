const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.createPost = async (req, res) => {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post,
                },
                message: "Post Created!"
            });
        }

        req.flash('success', "Post published!");
        return res.redirect('back');
        
    } catch (e) {
        req.flash('error', error);
        return res.redirect('back');
    }
};

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });

            post.remove();

            let comments = await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            req.flash('success', "Post with associated comments deleted");
        }
        return res.redirect('back');

    } catch (e) {
        req.flash('error', e);
        return res.redirect('back');
    }
}