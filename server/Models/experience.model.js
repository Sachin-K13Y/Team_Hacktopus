import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
    seniorId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    name:{
        type:String,
        
    },
    description:{
        type:String,
        required:true,
    },
    company: {
        type: String,
        required: true,
      },
    
    anonymous:{
        type:Boolean,
        default:false,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    offerStatus: {
        type: String,
        enum: ['accepted', 'rejected', 'waiting'],
    
        required:true
    },
    
    upvotes:[{
        type:mongoose.Types.ObjectId,
        ref:'User',
        default:0
    }]
    
},{timestamps:true})

const Experience = mongoose.model('Experience',experienceSchema);
export default Experience;