const{Contentmodel}=require("../models/content.model");

const addContent= async (req, res) => {
    try {
      // Read the image file as a Buffer
      const imageBuffer = req.file.buffer;
  
      // Save the image to MongoDB
      const content = new Contentmodel({
        text:req.body.text,
        imageName: req.file.originalname,
        data: imageBuffer,
        contentType: req.file.mimetype,
      });
      await content.save();
  
      res.status(201).json({ msg: "Image uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error in uploading image" });
    }
  }



  const getAllContent= async (req, res) => {
    try {
        const contentList = await Contentmodel.find({},"_id imageName contentType text");
        res.status(200).json(contentList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error fetching content" });
    }
}


const getContentById=async (req, res) => {
    try {
      const image = await Contentmodel.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      res.set("Content-Type", image.contentType);
      res.send(image.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching image" });
    }
}


  module.exports={
    addContent,
    getAllContent,
    getContentById
  }