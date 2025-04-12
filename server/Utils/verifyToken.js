import jwt, { decode } from 'jsonwebtoken'
import User from '../Models/user.model.js';

export const hasToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        
        if(!token){
            return res.status(403).json({success:false,message:"Unauthorized Access"});
        }

        const decodedToken = await jwt.verify(token,process.env.JWT_SECRET);

        const userId = decodedToken.id;
        req.user = decodedToken;
        //return res.status(200).json({success:true,user:req.user})

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false,message:"Internal Server Error"});
    }
}

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({success:false, message: 'Unauthorized' });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded.id);
    req.user = decoded;
return res.status(200).json({success:true,user:userData});
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Unauthorized' });
  }
};



