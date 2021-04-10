const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({}).populate('user', 'name email createdAt').sort('-createdAt')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
        });

    return res.status(200).json({
        message: "List of Posts",
        posts: posts
    });
};

module.exports.destroy = async function (req, res){
    try {
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
            post.remove();

            let comments = await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message: "Post with associated comments deleted"
            });
        }else{
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}