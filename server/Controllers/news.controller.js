import News from "../Models/news.model.js";


export const createNews = async (req, res) => {
  try {
    const { company, title, deadline, CGPA, description, type, link, batch } = req.body;
    
    const news = new News({
      company,
      title,
      deadline,
      CGPA,
      description,
      type,
      link,
      batch
    });

    await news.save();

    return res.status(201).json({ success: true, message: 'News created successfully', news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true }).sort({ deadline: 1 });
    return res.status(200).json({ success: true, news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
