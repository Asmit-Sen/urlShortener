import { createContext } from "react";

//export the context object
export const authContext = createContext(
    {
        loggedIn : false,
        setLogIn : ()=>{},
        setLogOut : ()=>{},
    }
)

//expor the context provider
export const AuthProvider = authContext.Provider;
