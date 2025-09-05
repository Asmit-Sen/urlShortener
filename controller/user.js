import userModel from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { setJwt } from '../utils/handleJwt.js';

const handleUserSignup = async (req, res) => {
    // Handle user signup logic here
    const { username, email, password } = req.body
    
    // hash the original password
    const hashedPassword = await  bcrypt.hash(password, 10)
    
    const user = await userModel.create({ username, email, password: hashedPassword })

    return res.status(201).render("login", {user});
    
}

const handleUserLogin = async (req, res) => {
    // Handle user login logic here
    const { email, password } = req.body;
    const user= await userModel.findOne({email : email})
    
    if(!user) {
        return res.status(401).render("login", { error: "Invalid email " });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    
    if (!match) {
        return res.status(401).render("login", { error: "Oops ! Wrong Password" });
    }

    // create jwt token and set it as cookie
    const token = setJwt(user)
    res.cookie("Bearer", token)
    
    // return res.status(200).render("home", { user });
    return res.status(200).redirect("/");
}


const handleUserLogout = (req, res) => {
    res.clearCookie("Bearer");
    return res.status(200).redirect("/login");
}

export { handleUserSignup, handleUserLogin, handleUserLogout };