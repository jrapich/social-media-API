const { Schema, model } = require('mongoose');

// Schema to create User model
//
const userSchema = new Schema(
  {
    //username will be required, unique, and always lowercase
    username: {
        type:String, 
        required:[true, 'username required'], 
        unique:true,
        lowercase:true,
        trim:true,
    },
    //email will be required, true, always lowercase, and will be validated against an email regex
    email: {
        type:String,
        required:[true, 'email required'],
        unique: true,
        lowercase:true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Valid email required'],
    },
    //an array of thoughts this user has shared
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    //an array of friends this user has
    friends: [ 
        {
        type: Schema.Types.ObjectId,
        ref:'user',
        },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual that will return the length of the friends array
userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;