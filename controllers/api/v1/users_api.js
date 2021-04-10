const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username/password"
            });
        }
        else{
            return res.status(200).json({
                message: "Sign in successful",
                data: jwt.sign(user.toJSON(), 'nocial', {expiresIn: '100000'})
            });
        }

    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};