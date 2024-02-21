// const router= require ("express").Router();
// const User = require ("../models/user");

// //SIGN up
// router.post("/register",async(req,res)=>{
//     try {
//         const{email,username,password}=req.body;
//         const hashpassword= bcrypt.hashSync(password);
//         const user = new User({email,username,password:hashpassword});
//         await user.save().then(()=>{
//             res.status(200).json({user:user})
//         });
 
//     } catch (error) {
//         // console.log(error);
//        res.status(400).json({message:"User Already Exists"}) ;
//     }
// });

// //Sign In
// router.post("/signin",async(req,res)=>{
//     try {
//         const user =await User.findOne({email:req.body.email})
//         if(!user){
//             res.status(400).json({message:"Please Sign-Up first"})
//         }
//         const isPasswordCorrect=bcrypt.compareSync(
//             req.body.password,
//             user.password
//         );
//         if(!isPasswordCorrect){
//             res.status(400).json({message:"Password is not correct"});
//         }
//         const{password, ...others} = user._doc;
//         res.status(200).json({others});
//     } catch (error) {
//         console.log(error);
//        res.status(400).json({message:"User Already Exists"}) ;
//     }
// });

// module.exports =router

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashpassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ email, username, password: hashpassword });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials. Please try again." });
        }
        const { password: userPassword, ...userData } = user._doc;
        res.status(200).json({ message: "User signed in successfully.", user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
