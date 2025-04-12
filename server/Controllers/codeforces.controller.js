import axios from "axios";
import User from "../Models/user.model.js"

export const getCodeforcesStats = async(req,res)=>{
    try {
        const users = await User.find({},'name codeforces');

        const handles = users.map((user)=> (user.codeforces)).join(';');

        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handles}`);

        

        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({success:false,message:"Internal Server Error"});
    }
}