const { Schema, model } = require('mongoose');

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

        },
        //the user who created the thought
        username: {
            type:String,
            required:[true, 'username required'],
        },
    },
    {
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

module.exports = Thought;