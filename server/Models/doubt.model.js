import mongoose from "mongoose"

const doubtSchema = mongoose.Schema({
    askedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        // required:true
    },
    question:{
        type:String,
        required:true,
    },
    upvote:[{
            type:mongoose.Types.ObjectId,
            ref:'User',
            default:0
        }],
    answers:[{
        answeredBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        },
        answeredText:{
            type:String,
            required:true
        },
        answeredAt:{
            type:Date,
            default:Date.now
        },
    }]


},{timestamps:true});

const Doubt = mongoose.model('Doubt',doubtSchema);
export default Doubt;