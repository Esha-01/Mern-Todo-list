// const express = require("express");
// const app = express();
// require("./conn/conn.js");
// const auth= require("./routes/auth");
// const list= require("./routes/list");

// app.use(express.json());


// app.get("/", (req, res) => {
//     res.send("Hello");
// });
// // app.use("/api/v1", auth);
// app.use("/api/v1", auth);
// app.use("/api/v2/list")
// app.use(auth);

// app.listen(1000, () => { 
//     console.log("Server Started");
// });

const express = require("express");
const app = express();
require("./conn/conn.js");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

// Mounting the auth routes under '/api/v1/auth'
app.use("/api/v1/auth", auth);

// Mounting the list routes under '/api/v2/list'
app.use("/api/v2/list", list);

app.listen(1000, () => { 
    console.log("Server Started");
});
