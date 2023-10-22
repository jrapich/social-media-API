const { Schema, model } = require('mongoose');
//dayjs for formatting dates
const {dayjsTools} = require('../utils');

const reactionSchema = new Schema(
    {
        //unique id of the reaction
        reactionID:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },  
        //reaction contents
        reactionBody:{
            type: String,
            required:[true, 'reaction body required'],
            maxLength:[280, 'reaction max character length is 280'],
        },
        //user who created the reaction
        username:{
            type:String,
            required:[true, 'username required'],
        },
        createdAt: {
            Type:Date,
            default: Date.now,
            get: dayjsTools.formatDate,
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

module.exports = Reaction;