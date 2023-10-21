const { Schema, model } = require('mongoose');

// Schema to create User model
//
const userSchema = new Schema(
  {
    username: {
        type:String, 
        required:true, 
        unique:true,
        lowercase:true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        unique: true,
        //add regex validator here, see docs
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [ 
        {
        type: Schema.Types.ObjectId,
        ref:'User',
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