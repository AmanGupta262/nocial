const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.addFriend = async (req, res) => {
    try {
        let isFriend = false;

        let userExists = await User.findOne({ _id: req.params.id });

        if (userExists) {
            let existingFriend = await Friendship.findOne({
                from_user: req.params.id,
                to_user: req.user._id
            });
            if(existingFriend){
                req.user.friends.pull(existingfriend._id);
                req.user.save();

                existingFriend.remove();
            }else{
                const newFriend = await Friendship.create({
                    from_user: req.user._id,
                    to_user: req.params.id
                });

                req.user.friends.push(newFriend._id);
                req.user.save();
                isFriend = true;

            }
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