const { Schema, model } = require('mongoose');
//for adding reactions to our reactions array
const Reaction = require('./Reaction');
//dayjs for formatting dates
const dayjsTools = require('../utils/dayjs');
//check the devlog env variable to see if we are logging extra things for dev purposes
const devLog = process.env.DEVLOGGING === 'true' ? true : false;

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        //thought text will be required, mi 1 character long and max 280
        thoughtText: {
            type:String, 
            required:[true, 'thought text required'],
            minLength:[1, 'thought must have at least 1 character'],
            maxLength:[280, 'thought must not have more than 280 characters'],

        },
        //thought created timestamp. use dayJS to format with a getter method 
        createdAt: {
            type:Date,
            default: Date.now,
            get: dayjsTools.formatDate,
            
        },
        //the user who created the thought
        username: {
            type:String,
            required:[true, 'username required'],
        },
        //any reactions/replies to this thought
        reactions:[Reaction],
    },
    {
        //if we added this, mongoose would add createdAt and updatedAt by default automatically whenever the doc is created or updated
        //we aren't using this though because we are using a manual getter for createdAt and timestamps:true will overwrite anything we use for that property
        //timestamps:true,
        toJSON: {
          virtuals: true,
          //here we add getters so the get property on createdAt will function every time this model is queried
          getters:true,
        },
        id: false,
    }
);

//virtual to return the number of reactions on this thought
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});


// Initialize our THOUGHT model
const Thought = model('thought', thoughtSchema);

//devlogs for testing
if (devLog) {
    console.log(dayjsTools.formatDate(Date.now));
}

module.exports = Thought;