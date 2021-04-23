const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.addFriend = async (req, res) => {
    try {
        let isFriend = false;

        let existingFriend = await Friendship.findOne({
            from_user: req.user._id,
            to_user: req.params.id
        });

        let toUser = await User.findById(req.params.id);
        let fromUser = await User.findById(req.user._id);

        if (existingFriend) {
            fromUser.friends.pull(existingFriend._id);
            toUser.friends.pull(existingFriend._id);

            fromUser.save();
            toUser.save();

            existingFriend.remove();
        } else {
            const newFriend = await Friendship.create({
                from_user: req.user._id,
                to_user: req.params.id
            });
            fromUser.friends.push(newFriend._id);
            toUser.friends.push(newFriend._id);

            fromUser.save();
            toUser.save();
            
            isFriend = true;
        }

        return res.status(200).json({
            message: "Request Successful",
            data: {
                isFriend: isFriend
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }


};