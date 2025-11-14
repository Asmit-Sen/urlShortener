import express from 'express'
import cors from 'cors'
import router from './router/url.js'
import staticRouter from './router/staticRouter.js'
import userRouter from './router/user.js';

import connectMongoDB from './connection.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//set up cors policy
const corsOptions ={
    origin:'http://localhost:5173',
    credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

//use middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

//connect to mongo
connectMongoDB("mongodb://127.0.0.1:27017/urlShortener")
.then(()=>console.log("MongoDB connected"));

app.get('/test', (req,res)=>res.json({msg: "test api working"}));

//server endpoints
app.use('/url', router);
app.use('/user', userRouter);

app.listen(PORT, ()=>{
    console.log(`Port is running on PORT : `,PORT);
})
