const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const { connection } = require("./config/db");
const { contentRouter } = require("./routes/content.router");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Basic API endpoint for image upload assignment");
})

app.use("/", contentRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Database Connected successfully.");
        console.log(`server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("Unable to connect to Database");
    }
})






