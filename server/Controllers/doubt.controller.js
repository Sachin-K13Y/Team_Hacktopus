import Doubt from "../Models/doubt.model.js";

export const addDoubt = async(req,res)=>{
    try {
        const userId = req.user.id
    

        const {question} = req.body;

        const newDoubt = new Doubt({
            askedBy:userId,
            question,
            
        })

        await newDoubt.save();

        return res.status(200).json({success:true,message:"Doubt Asked Successfully",Doubt:newDoubt});
    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false,message:"Internal Server Error"});
    }
    
}

export const upvoteDoubt = async (req, res) => {
    try {
      const doubtId = req.params.id;
      const userId = req.user.id;
  
      const doubt = await Doubt.findById(doubtId);
      if (!doubt) {
        return res.status(404).json({ message: "Doubt not found" });
      }
      // console.log(doubt);
      if (doubt.upvote.includes(userId)) {
        return res.status(400).json({ message: "You have already upvoted this doubt" ,doubt});
      }
  
      doubt.upvote.push(userId);
      await doubt.save();
  
      return res.status(200).json({ succes:true, message: "Doubt upvoted successfully",doubt});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

export const deleteDoubt = async(req,res)=>{
    try {
        const questionId = req.params.id;

        const existQuestion = await Doubt.findByIdAndDelete(questionId);

        if(!existQuestion){
            res.status(404).json({success:false,message:"Question Not Found"});
        }

        return res.status(200).json({success:true,message:"Question Deleted Successfully",question:existQuestion});

    } catch (error) {
        
    }
}

export const addAnswer = async(req,res)=>{
    try {
        const questionId = req.params.id;

        const question = await Doubt.findById(questionId);
        
        const {answeredText} = req.body;
        const answer={
            answeredText,
            answeredBy:req.user.id
        }

        question.answers.push(answer)
        await question.save();
        return res.status(200).json({success:true,message:"Answered Successfully",question});
    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false,message:"Internal Server Error"});
    }
}
export const GetAllDoubts = async (req, res) => {
    try {
      const doubts = await Doubt.find()
        .populate("askedBy", "name")
        .populate({
          path: "answers",
          populate: {
            path: "answeredBy",
            select: "name",
          },
        });
      return res.status(200).json({ success: true, doubts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
