import express from 'express';
import {handleUserSignup, handleUserLogin, handleUserLogout} from '../controller/user.js';
const router = express.Router();

router.post("/signup",handleUserSignup);

router.post("/login",handleUserLogin);

router.post("/logout", handleUserLogout)

export default router;