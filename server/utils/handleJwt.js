import jwt from 'jsonwebtoken';

const setJwt = (user) =>{
    const payload = { 
            userId: user._id, 
            email: user.email, 
            role: user.role 
        }
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log("Signed jwt : ", token);
        
    return token;
}

const checkJwt = (token) => {
    const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Payload : ", decodedPayload);
    return decodedPayload;
}

export {checkJwt, setJwt};