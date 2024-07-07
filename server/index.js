import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/auth.js";
import userRoute from "./routes/userRoute.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;


mongoose.connect(URL).then(()=>{
    console.log("DB connected successfully");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));

// app.use("/",userRoute);
app.use("/api/auth",AuthRoutes);
app.use("/", userRoute);