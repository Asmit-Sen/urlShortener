import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/user/signup`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }),
            credentials: 'include' // include cookies in the request
        });

        try {
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to sign up");
            }
            const data = await response.json();
            console.log("User signed up successfully:", data);
            navigate("/login");
        } catch (error) {
            console.error("Error signing up user:", error.message);
        }
    }

  return (
    <div className='h-screen flex flex-col justify-center '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 min-w-1/4 mx-auto mt-8 rounded-3xl p-5 border border-gray-300'>

            <input className="font-mono border border-gray-300 p-2 rounded-3xl pl-7 text-white h-12" required autoFocus value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

            <input className="font-mono border border-gray-300 p-2 rounded-3xl pl-7 text-white h-12" value={email} type="text" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />

            <input className="font-mono border border-gray-300 p-2 rounded-3xl pl-7 text-white h-12" required value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button className="font-mono bg-violet-800 text-white p-2 rounded-3xl" type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default LoginPage
