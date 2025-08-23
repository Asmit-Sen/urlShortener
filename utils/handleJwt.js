import jwt from 'jsonwebtoken';

const setJwt = (user) =>{
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY);
    return token;
}

const checkJwt = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}


export {checkJwt, setJwt};