import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        enum:['junior','senior','admin'],
        default:'junior'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    codeforces:{
        type:String,
        default:''
    }

},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;