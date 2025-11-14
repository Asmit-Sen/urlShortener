import { useEffect, useState } from 'react'

function Profile() {
    const [data,setData]=useState(null);

    useEffect(()=>{
        const getAnalytics = async () => {
          fetch(`http://localhost/url/analytics/:${shortId}`)
          .then(res=>res.json())
          .then(data=>{
              setData(data);
              console.log(data);
          })  
          .catch(err=>console.log(err));
          }
        getAnalytics();
    },[]);

  return (
    <div className='text-white h-screen flex flex-col justify-center 
    font-mono text-center'>
      Hello from profile
      {data}
    </div>
  )
}

export default Profile