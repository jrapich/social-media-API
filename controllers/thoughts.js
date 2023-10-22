const {Thought, User} = require('../models');
//devlogging variable for debugging purposes
const devLog = process.env.DEVLOGGING === 'true' ? true : false;
//function for dev logs to console
const logFunction = (toast) => {
    if(devLog) {
        console.log(toast);
    }
    return;
}
//return an object with all thoughts in the db
const allThoughts =  async (req, res) => {
    try {
        const thoughts = await Thought.find();

        logFunction(thoughts);

        res.json(thoughts);
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
//return a single thought in the db
const singleThought = async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .select('-__v');

        logFunction(thought);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
    }

      res.json(thought);
    } catch (err) {
        logFunction(err);  
      res.status(500).json(err);
    }
}
//create a thought, and store its id in the creating user's document
const createThought = async (req, res) => {
    try {
        const isUser = await User.findOne({_id: req.body.userID});
        //check to make sure the submitted user exists first before creating the thought
        if(!isUser) {
            return res.status(404).json({message:'No user by that id exists, thought discarded.'});
        }

        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userID },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        logFunction(thought);
        
        !user ? res.status(404).json({message: `userID ${req.body.userID} not found. thought created with no valid user.`}) : res.json(thought);
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
//update an existing thought
const updateThought = async (req,res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        logFunction(thought);
        res.json({thought:thought, message:` thought updated by ${thought.username}.`});
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
//delete an existing thought and all of its reactions
const deleteThought = async (req,res) =>{
    try {

        const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        logFunction(thought);

        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );

        const deleteReactions = await Thought.deleteMany({_id: {$in: thought.reactions}});
        logFunction(deleteReactions);

        res.json({ message: 'thought and associated reactions deleted!' });
    } catch (err) {
        console.error(err);
        logFunction(err);
        res.status(500).json(err);
    }
}
//add a reaction to an existing thought
const addReaction = async (req, res) =>{
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
    
        res.json(thought);
    } catch (e) {
        logFunction(e);
        res.status(500).json(e);
    }
}
//remove an existing reaction from an existing thought
const deleteReaction = async (req,res) =>{
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: {reactionID: req.params.reactionID} } },
            { runValidators: true, new: true }
        );
        !thought ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json({message:"reaction deleted"});
    } catch (e) {
        logFunction(e);
        res.status(500).json(e);
    }
}
//export all of the things
module.exports = {allThoughts, singleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction};