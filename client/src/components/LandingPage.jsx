import React from 'react'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate("/signup");
    }

    return (
        <div className="font-mono text-center py-12 flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-violet-400">Welcome to trim.io</h1>
            <p className="text-md text-white mt-4">Shorten your long URLs quickly and easily!</p>
            <button onClick={handleClick} className="mt-6 px-6 py-2 bg-violet-800 text-white text-lg font-medium rounded-3xl transition duration-200 ease-in-out hover:bg-violet-600">
                Get Started
            </button>
        </div>
    );
}

export default LandingPage
