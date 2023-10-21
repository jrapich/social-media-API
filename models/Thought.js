const { Schema, model } = require('mongoose');
//dayjs for formatting dates
const dayjs = require('dayjs');
//check the devlog env variable to see if we are logging extra things for dev purposes
const devLog = process.env.DEVLOGGING === 'true' ? true : false;

//function to format dates we will use in a getter
function formatDate (date){
    return dayjs(date).format('MM/DD/YYYY:hh:mm:ss:A');
}

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
            Type:Date,
            default: Date.now,
            get: formatDate,
            
        },
        //the user who created the thought
        username: {
            type:String,
            required:[true, 'username required'],
        },
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


// Initialize our THOUGHT model
const Thought = model('thought', thoughtSchema);

//devlogs for testing
if (devLog) {
    console.log(formatDate(Date.now));
}

module.exports = Thought;