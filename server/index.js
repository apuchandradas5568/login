import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";


const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();


app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: true, limit: '1mb'}));
app.use(express.static('public'));
app.use(cookieParser())


// importing routes
import userRoutes from './routes/user.routes.js';

app.use('/api/v1/users', userRoutes)




// Connect to MongoDB
app.listen(3000, ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("database connected");
        console.log('server is running !!!');
    })
    .catch((err)=>{
        console.log(err);
    })
})
