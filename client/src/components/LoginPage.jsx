import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const authStatus = useAuthContext();

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/signup");
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/user/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // include cookies in the request
        });
        
        if(response.ok) {
            console.log("Login successful");
            const data = await response.json();

            localStorage.setItem("Bearer", data.Bearer);
            authStatus.setLogIn();
            navigate("/");
        }
        else console.log("Login failed");

        console.log("Tried logging in with", { email, password });
    }

  return (
    <div className='h-screen flex flex-col justify-center '>

        <form action="submit" onSubmit={handleSubmit} className='flex flex-col items-center gap-4 min-w-1/4 mx-auto mt-8 rounded-3xl p-5 border border-gray-300'>

            <input className="font-mono border border-gray-300 pl-7 rounded-3xl text-white w-full h-12" value={email} type="text" placeholder="Email" required autoFocus onChange={(e) => setEmail(e.target.value)} />

            <input className="font-mono border border-gray-300 pl-7 rounded-3xl text-white w-full h-12" value={password} type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

            <button className="font-mono bg-violet-800 text-white p-2 w-full rounded-3xl" type="submit">Login</button>

            <div className='flex justify-center items-center mt-5 gap-5'>
                <p className='font-mono text-white'>No account yet?</p>
                <button onClick={handleSignUp} className="font-mono w-30 rounded-3xl bg-violet-800 text-white p-2">
                    Sign Up
                </button>
            </div>
        </form>

        
    </div>
  )
}

export default LoginPage