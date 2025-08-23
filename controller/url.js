import {nanoid} from 'nanoid'
import urlModel from '../model/url.js';

//POST /url/shorten
const handleShorten = async(req, res)=>{
    const longUrl = req.body.longUrl;
    const email = req.user.email;
    if(!longUrl) return res.status(400).send("No url found")

    const shortId = nanoid(8);
    if(!shortId) res.status(500).send("Internal Server error")

    //store the mapping in database
    const url = await urlModel.create({
        longUrl, shortId, email
    })

    if(shortId) res.status(201).render('home', { longUrl, shortId });
};


//GET /url/:id
const handleRedirect = async(req, res)=>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).send("No ShortId found")

    const url = await urlModel.findOneAndUpdate(
        { shortId }, 
        { $push : {analytics : Date.now()} })

    if(!url) return res.status(404).send({msg : "Url Not Found"})

    res.status(302).redirect(`${url.longUrl}`)
}


//GET /url/analytics/:id
const handleAnalytics = async (req, res) =>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).send("No ShortId found")
    
    const url = await urlModel.findOne({shortId});

    if(!url) return res.status(404).send({msg : "Url Not Found"})
    
    res.status(200).send({analytics : url.analytics})

} 

export {handleShorten, handleRedirect, handleAnalytics};