const express = require("express");
const contentRouter = express.Router();

const { upload } = require("../config/multer");
const { addContent, getAllContent,getContentById } = require("../controllers/content.controller");


contentRouter.post("/upload", upload.single("image"), addContent);


contentRouter.get("/allcontent", getAllContent);

contentRouter.get("/image/:id",getContentById);

module.exports = {
    contentRouter
}