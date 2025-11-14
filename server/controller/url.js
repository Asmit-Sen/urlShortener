import {nanoid} from 'nanoid'
import urlModel from '../model/url.js';

//POST /url/shorten
const handleShorten = async(req, res)=>{
    const longUrl = req.body.longUrl;
    const email = req.user.email;

    if(!longUrl) return res.status(400).send("No url found")

    const prev= await urlModel.find({email : email, longUrl : longUrl})
    if(prev.length!=0) return res.status(200).json({ longUrl: prev[0].longUrl, shortId: prev[0].shortId, msg: "URL already shortened"});

    const shortId = nanoid(8);

    if(!shortId) res.status(500).send("Internal Server error")

    //store the mapping in database
    const url = await urlModel.create({
        longUrl, shortId, email
    })

    if(shortId) res.status(201).json({ longUrl, shortId });
};


//GET /url/:id
const handleRedirect = async(req, res)=>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).send("No ShortId found")

    const url = await urlModel.findOneAndUpdate(
        { shortId }, 
        { $push : {analytics : Date.now()} })

    if(!url) return res.status(404).send({msg : "Url Not Found"})

    res.status(302).json({  longUrl : url.longUrl})  //302 for redirection
}

//GET /url/getAll/:email
const handleGetUrlsByEmail = async (req, res) => {
    const email = req.params.email;
    if (!email) return res.status(400).send("No email found");

    const urls = await urlModel.find({ email });
    if (!urls || urls.length === 0) return res.status(404).send({ msg: "No URLs found for this email" });

    res.status(200).json(urls);
};

//GET /url/analytics/:id
const handleAnalytics = async (req, res) =>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).json({error : "No ShortId found"})

    const url = await urlModel.findOne({shortId});

    if(!url) return res.status(404).json({msg : "Url Not Found"})
    
    res.status(200).json({analytics : url.analytics})

} 

export {handleShorten, handleRedirect, handleAnalytics, handleGetUrlsByEmail};