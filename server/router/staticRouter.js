import express from "express";
import urlModel from "../model/url.js";

import { handleAuth, restrictTo } from "../middleware/auth.js";
import userModel from "../model/user.js";

const staticRouter = express.Router();

//authenticated route
staticRouter.get("/", handleAuth, async (req, res) => {
    const allUrls = await urlModel.find({ email: req.user.email });
    console.log("All URLs for user:", allUrls);
    
    res.status(200).render("home", { allUrls });
});

staticRouter.get("/signup", (req, res) => {
    res.status(200).render("signup");
});

staticRouter.get("/login", (req, res) => {
    res.status(200).render("login");
});

//protected route
staticRouter.get("/admin", handleAuth, restrictTo(['admin']), async(req,res) => {
    const allUsers = await userModel.find()
    const allUrls = await urlModel.find()
    res.status(200).render("adminPage", {allUsers, allUrls})
})

export default staticRouter;

