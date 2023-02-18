const mongoose = require("mongoose");

mongoose.set('strictQuery',false);

const connectDB = () =>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Connection to the database is successful`);
    }).catch((err)=>{
      // console.log(`The following error has occured : ${err}`);
      console.log(err);
    })
}

module.exports = connectDB;
