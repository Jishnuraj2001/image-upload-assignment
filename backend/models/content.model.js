const mongoose=require("mongoose");

const contentSchema=mongoose.Schema({
    text:String,
    imageName: String,
    data: Buffer,
    contentType: String,
});

const Contentmodel=mongoose.model("content",contentSchema);

module.exports={
    Contentmodel
}