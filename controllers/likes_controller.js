const Like = require('../models/like');
const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.toggleLike = async (req, res ) => {
    try {
        let likable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likable = await Post.findById(req.query.id).populate('likes');
        }else{
            likable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like exist
        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If a like already exists delete it
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();

            existingLike.remove();
            deleted = true;
        }else{
            // else create a new like
            const like = await Like.create({
                likable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });

            likable.likes.push(like._id);
            likable.save();
        }

        return res.status(200).json({
            message: "Request Successful",
            data: {
                deleted: deleted
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};