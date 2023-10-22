const {Thought} = require('../models');
//devlogging variable for debugging purposes
const devLog = process.env.DEVLOGGING === 'true' ? true : false;
//function for dev logs to console
const logFunction = (toast) => {
    if(devLog) {
        console.log(toast);
    }
    return;
}

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
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        logFunction(thought);
        res.json(thought);
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
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
        res.json({thought:thought, message:`${thought.username} updated.`});
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
const deleteThought = async (req,res) =>{
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        logFunction(thought);

        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

        const deleteReactions = await Thought.deleteMany({_id: {$in: thought.reactions}});
        logFunction(deleteReactions);
        res.json({ message: 'thought and associated reactions deleted!' });
    } catch (err) {
        logFunction(err);
        res.status(500).json(err);
    }
}
module.exports = {allThoughts, singleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction};