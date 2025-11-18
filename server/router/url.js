import express from 'express'
import { handleShorten, handleRedirect,handleAnalytics, handleGetUrlsByEmail } from "../controller/url.js";
import { handleAuth } from "../middleware/auth.js";

const router = express.Router();

router.get('/test', (req,res)=>
    res.json({msg: "url route test api working"})
);

router.get('/getAll',handleAuth, handleGetUrlsByEmail);

router.post('/shorten', handleAuth, handleShorten);

router.get('/:shortId',handleAuth, handleRedirect);

router.get('/analytics/:shortId',handleAuth, handleAnalytics);

export default router;  