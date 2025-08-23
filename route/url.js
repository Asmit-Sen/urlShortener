import express from 'express'
import { handleShorten, handleRedirect,handleAnalytics } from "../controller/url.js";
import {handleAuth} from "../middleware/auth.js";

const router = express.Router();
router.post('/shorten', handleAuth, handleShorten);

router.get('/:shortId',handleRedirect);

router.get('/analytics/:shortId',handleAnalytics);

export default router;