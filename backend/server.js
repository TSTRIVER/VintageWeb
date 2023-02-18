const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");

cloudinary.config({
     cloud_name : process.env.CLOUDINARY_NAME,
     api_key : process.env.CLOUDINARY_API_KEY,
     api_secret : process.env.CLOUDINARY_API_SECRET
})

connectDB();

app.listen(process.env.PORT,()=>{
     console.log(`Listening to the port : ${process.env.PORT}`);
})