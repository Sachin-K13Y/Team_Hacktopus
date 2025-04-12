import Experience from "../Models/experience.model.js";

export const addExperience = async (req, res) => {
  try {
    const { name, description, company, anonymous } = req.body;
    const seniorId = req.user.id;

    const experience = new Experience({
      seniorId,
      name,
      description,
      company,
      anonymous,
      difficulty,
      offerstatus
    });

    await experience.save();

    return res.status(201).json({ success:true, message: 'Experience added successfully',experience });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success:false, message: 'Internal Server Error' });
  }
};

export const deleteExperience = async(req,res)=>{
    try {
        const expId = req.params.id;
        
        const existExperience = await Experience.findByIdAndDelete(expId);

        if(!existExperience){
            return res.status(404).json({success:false,message:"Experience Not Found"});
        }

        return res.status(200).json({success:true,message:"Experience Deleted Successfully",existExperience});

    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false,message:"Internal Server Error"});
    }
}

export const addUpvote = async(req,res)=>{
    try {
        const expId = req.params.id;

        const experience = await Experience.findById(expId);
        const userId = req.user.id;
        
        if(!experience.upvotes.includes(userId)){
            experience.upvotes.push(userId);
        }
        await experience.save();
    
        return res.status(200).json({success:true,experience});
    } catch (error) {
        console.log(error);
    }

}
export const GetAllExperiences = async (req, res) => {
    try {
      const experiences = await Experience.find();
      return res.status(200).json({ success: true, experiences });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  