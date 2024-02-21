const router = require("express").Router();
const User = require('../models/user');
const List = require('../models/list');

//Create
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();
            existingUser.list.push(list); // Push the list into existingUser's list array
            await existingUser.save(); // Save existingUser with the updated list array
            res.status(200).json({ message:"Task added",list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const list = await List.findOneAndUpdate(
                { _id: req.params.id, user: existingUser._id },
                { title, body },
                { new: true } // Return the updated document
            );
            if (list) {
                res.status(200).json({ message: "Task Updated", list });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Delete

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            const list = await List.findOneAndDelete(
                { _id: req.params.id, user: existingUser._id }
            );
            if (list) {
                res.status(200).json({ message: "Task Deleted"});
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//getTask
router.get("/getTasks/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const list = await List.find({ user: userId }).sort({ createdAt: -1 });
        if (list && list.length !== 0) {
            res.status(200).json({ list: list });
        } else {
            res.status(404).json({ message: "No Tasks found for the user" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;


