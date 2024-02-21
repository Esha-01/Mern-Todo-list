// const mongoose = require ("mongoose");
// const conn = async(req,res) =>{
//     (await mongoose.connect("mongodb+srv://eshakumari593:MaWBb5px2c3mdAd6@cluster0.mamr9hr.mongodb.net/"))
//     .then(()=>{
//         console.log("Connected");
//     });
// }

const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://eshakumari2002:OG5PgKEKWnNCgtcA@cluster0.o1mf9jx.mongodb.net/", {
            // useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection error:", error);
    }
};

module.exports = conn;


// Call the function to establish the connection
conn();

