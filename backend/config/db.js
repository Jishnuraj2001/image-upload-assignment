const mongoose=require("mongoose");

const connection=mongoose.connect(process.env.db_url);

module.exports={
    connection
}