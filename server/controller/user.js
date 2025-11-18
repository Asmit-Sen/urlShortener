import userModel from '../model/user.js';
import bcrypt from 'bcrypt';
import { setJwt } from '../utils/handleJwt.js';

const handleUserSignup = async (req, res) => {
    // Handle user signup logic here
    const { username, email, password } = req.body

    const prev= await userModel.findOne({email : email})
    if(prev) return res.status(400).json({error : "User already exists"})
    
    // hash the original password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await userModel.create({ username, email, password: hashedPassword })

    return res.status(201).json({
        user, 
        msg: "User Created Successfully"
    });
}

const handleUserLogin = async (req, res) => {
    // Handle user login logic here
    const { email, password } = req.body;
    const user = await userModel.findOne({email : email})
    
    if(!user) {
        return res.status(400).json({ error: "Oops ! User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    
    if (!match) {
        return res.status(403).json({ error: "Oops ! Wrong Password" });
    }

    // create jwt token 
    const token = setJwt(user)
    //set the jwt token as a cookie
    res.cookie("Bearer", token);

    console.log("Login Successful, token set in cookie : ", token);
    return res.status(200).json({msg: "Login Successful", "Bearer": token});
}


const handleUserLogout = (req, res) => {
    res.clearCookie("Bearer");
    return res.status(200).json({msg: "Logout Successful"});
}

export { handleUserSignup, handleUserLogin, handleUserLogout };