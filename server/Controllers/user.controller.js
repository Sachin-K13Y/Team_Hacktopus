import User from "../Models/user.model.js";
// import Experience from '../Models/experience.model.js';
// import Doubt from '../Models/doubt.model.js';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { authenticateUser } from '../Utils/verifyToken.js';

export const Register = async(req,res)=>{
  try {
    const {name,email,password,codeforces} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({success:false,message:"Please fill all fields"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const userExist = await User.findOne({email});
    if(userExist){
      return res.status(403).json({success:false,message:"User already exist"});
    }
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
      codeforces,
    })
    await newUser.save();
    res.status(200).json({success:true,message:"User registered Successfully","User":newUser});
  } catch(err){
    console.log(err);
    res.status(403).json({success:false,message:"Internal Server Error",err});
  }
}

export const Login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    if (!email || !password) {
      return res.status(400).json({success:false,message:"Please fill all fields"});
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({success:false,message:"User not Exist"});
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
      return res.status(403).json({success:false,message:"Invalid Credentials"});
    }
    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'1d'}
    );
    res.cookie('token',token,{
      httpOnly:true,
      secure:false,
      maxAge:3*24*60*60*1000,
    })
    res.status(200).json({success:true,user,token});
  } catch (error) {
    console.log(error);
    return res.status(403).json({success:false,message:"Internal Server Error"});
  }
}

export const Logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

// export const Userprofile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     const experiences = await Experience.find({ userId });
//     const doubts = await Doubt.find({ askedBy: userId });
//     res.json({ user, experiences, doubts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching profile" });
//   }
// };
