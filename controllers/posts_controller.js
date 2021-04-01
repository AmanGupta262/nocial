const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = (req, res) => {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },
    (err, post) => {
        if(err){ console.log("Error in creating post"); return; }

        return res.redirect('back');
    });
};

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            let comments = await Comment.deleteMany({ post: req.params.id });
        }
        return res.redirect('back');

    } catch (e) {
        console.log("Error ", e);
        return;
    }
}