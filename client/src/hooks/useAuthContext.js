import { useContext } from "react";
import { authContext } from "../contexts/authContext.js";

//custom hook to use the auth context
export default function useAuthContext() {
    //the actual context value
    const myAuthContext = useContext(authContext);
    return myAuthContext;
}

