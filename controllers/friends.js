const {User, Thought} = require('../models');
//devlogging variable for debugging purposes
const devLog = process.env.DEVLOGGING === 'true' ? true : false;
//function for dev logs to console
const logFunction = (toast) => {
    if(devLog) {
        console.log(toast);
    }
    return;
}

module.exports = {
    async addFriend(req,res){
        try {
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $addToSet: {friends: req.params.friendID} },
                { runValidators: true, new: true }
            );

            if(!newFriend){
                return res.status(404).json({ message: 'No username with this id!' });
            }
            logFunction(newFriend);

            res.json({message:'new friend added!'});
        } catch (err) {
            logFunction(err);
            res.status(500).json(err);
        }
    },
    async deleteFriend(req,res){
        try {
            const oldFriend = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $pull: { friends: { _id: req.params.friendID } } },
                { runValidators: true, new: true }
            );

            if(!oldFriend){
                return res.status(404).json({ message: 'No username with this id!' });
            }
            logFunction(oldFriend);

            res.json({message:'old friend deleted!'});
        } catch (err) {
            logFunction(err);
            res.status(500).json(err);
        }
    }
}