import express from 'express'
import { handleShorten, handleRedirect,handleAnalytics, handleGetUrlsByEmail } from "../controller/url.js";
import { handleAuth } from "../middleware/auth.js";

const router = express.Router();
router.post('/shorten', handleAuth, handleShorten);

router.get('/:shortId',handleAuth, handleRedirect);

router.get('/analytics/:shortId',handleAuth, handleAnalytics);

router.get('/getAll/:email', handleAuth, handleGetUrlsByEmail);
export default router;  