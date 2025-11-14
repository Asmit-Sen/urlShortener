import React, { useState } from 'react'

const Home = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortId, setShortId] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("URL to shorten:", longUrl);

        const options={
            headers :{
                'Content-Type' : 'application/json',
                'credentials' : 'include'  //to include cookies in the request
            },
            method : 'POST',
            body : JSON.stringify({longUrl}),
            credentials : 'include'  //to include cookies in the request
        }

        const response = await fetch('http://localhost:8000/url/shorten', options);
        console.log(response);
        

        if(response.ok){
            const data = await response.json();
            console.log("Shortened URL:", data.shortId);
            setShortId(data.shortId);
        }
        else
            console.log("Error shortening URL");
    }

  return (
    <>
        <div className='h-screen flex flex-col justify-center '>
        <div className=''>
            <form className='flex flex-row gap-5 justify-center min-w-2/3 w-full mx-auto mt-8 rounded-3xl p-5' action="submit" onSubmit={handleSubmit}>
            <input className="font-mono min-w-1/2 pl-7 rounded-3xl text-violet-200 border border-violet-200 h-12" 
            type="text" 
            value={longUrl}
            required
            onChange={(e) => setLongUrl(e.target.value)} 
            placeholder="Enter Your Long URL" />
            <button className="font-mono min-w-20 w-25 border bg-violet-800 text-white p-2 rounded-3xl hover:bg-violet-600 transition ease-in-out duration-200" type="submit">Shorten</button>
            </form>

            { shortId && 
            <div className='text-center mt-4 flex justify-center gap-5 '>
                <p className='font-mono text-white'>Visit Shortened URL : </p>
                <a className='font-mono text-white' href={`${longUrl}`}>
                {`https://www.${shortId}.com`}
                </a>
            </div>
            }
            </div>
        </div>
    </>
    
    )
}

export default Home