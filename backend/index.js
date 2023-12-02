require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const topicsRouter = require("./api/topics/topics.router");
const testRouter = require("./api/test/test.router");
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's domain
    credentials: true // Enable sending cookies and other credentials
  }));
app.use("/api/users",userRouter)
app.use("/api/topics",topicsRouter)
app.use("/api/test",testRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log("server is up and running")
})