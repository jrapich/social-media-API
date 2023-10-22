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

//return object of all users in db
const getUsers = async (req,res) =>{
    try {
        const users = await User.find();

        logFunction(users);

        res.json(users);
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
//return a single user by id, as well as populate a list of their friends, if any
const getSingleUser = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
      .select('-__v').populate({path:'friends', select:'-__v'});

      logFunction(user);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      logFunction(err);  
      res.status(500).json(err);
    }
}
//add a single user to db
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        logFunction(user);
        res.json(user);
      } catch (err) {
        logFunction(err);
        (err.code === 11000) ? res.status(400).json({message:`username ${req.body.username} or email ${req.body.email} already exists, pick another`}) 
        : res.status(500).json(err);
      }
}
//update an existing user
const updateUser = async (req,res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        logFunction(user);
        res.json({user:user, message:`${user.username} updated.`});
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
//delete a user from the db as well as any thoughts they have created
const deleteUser = async (req,res) =>{
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        logFunction(user);

        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }

        const deleteThoughts = await Thought.deleteMany({_id: {$in: user.thoughts}});
        logFunction(deleteThoughts);
        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
module.exports = {getUsers, getSingleUser, createUser, updateUser, deleteUser};     