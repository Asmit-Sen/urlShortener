
import { checkJwt } from '../utils/handleJwt.js';

const handleAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!req.cookies || !token) {
        //not authenticated user
        return res.status(401).redirect("/login");
    }
    try{
        const decoded = checkJwt(token);
        req.user = decoded;
        next();
    }
    catch (err){
        console.log(err);
        return res.status(401).redirect("/login");
    }
}

const restrictTo = (roles=[]) => {
    return (req, res, next) => {

        const user= req.user

        // if user is not authenticated 
        if(!user) res.status(401).redirect("/login");

        //if user is authenticated but not authorised if the role
        //is not in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("You do not have permission to perform this action");
        }
        next();
    }
}

export {handleAuth, restrictTo};