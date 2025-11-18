import { useEffect, useState } from 'react'
import AnimatedList from './AnimatedList.jsx'

function Profile() {
    const [data,setData]=useState(null);

    useEffect(()=>{
        const getAllUrls = async () => {
            await fetch(`http://localhost:8000/url/getAll`, {
              method: 'GET',
              credentials: 'include'}
            ).then(res=>res.json())
            .then(data=>{
                setData(data);
                console.log(data);
            })  
            .catch(err=>console.log(err));
          }
        getAllUrls();
    },[]);

  return (
    <div className='min-h-screen overflow-hidden'>
        <div className='text-white mt-20 flex flex-col justify-start items-center 
        font-mono'>
        {data && data.length > 0 ? (
          <div className="w-full max-w-4xl">
            <h2 className='text-2xl mb-4 text-center'>Your Links</h2>
            <AnimatedList
              items={data}
              onItemSelect={(item, index) => console.log(item, index)}
              showGradients={false}
              enableArrowNavigation={true}
              displayScrollbar={false}
              className="w-full"
            />
          </div>
        ) : (
          <p>No shortened URLs found.</p>
        )}
      </div>
    </div>

  )
}

export default Profile