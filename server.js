import express from 'express'
import router from './route/url.js'
import staticRouter from './route/staticRouter.js'
import userRouter from './route/user.js';

import connectMongoDB from './connection.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//use middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

//set view engine
app.set("view engine", "ejs");
app.set("views", "./view");

//connect to mongo
connectMongoDB("mongodb://127.0.0.1:27017/shortener")
.then(()=>console.log("MongoDB connected"));

//serve ejs files from server
app.use('/', staticRouter);

//server endpoints
app.use('/url', router);
app.use('/user', userRouter);

app.listen(PORT, ()=>{
    console.log(`Port is running on PORT : `,PORT);
})
