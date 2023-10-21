const { Schema, model } = require('mongoose');
//dayjs for formatting dates
const dayjs = require('dayjs');

//function to format dates we will use in a getter
function formatDate (date){
    return dayjs(date).format('MM/DD/YYYY:hh:mm:ss:A');
}

const readtionSchema = new Schema(
    {
        //unique id of the reaction
        reactionID:mongoose.ObjectId,
        //reaction contents
        reactionBody:{
            type: String,
            required:[true, 'reaction body required'],
        },
        //user who created the reaction
        username:{
            type:String,
            required:[true, 'username required'],
        },
        createdAt: {
            Type:Date,
            default: Date.now,
            get: formatDate,
        },
    }
);

module.exports = Reaction;