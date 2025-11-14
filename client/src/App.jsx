import React, { useState } from 'react'
import { AppLayout, Home, LandingPage, LoginPage, Profile, SignupPage } from './components'
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';

import {DarkVeil} from './components/index';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("Bearer")?true:false);

  if (localStorage.getItem("Bearer")) {
    if (!loggedIn) setLoggedIn(true);
  } else {
    if (loggedIn) setLoggedIn(false);
  }

  const setLogIn=()=>{
    setLoggedIn(true);
  }

  const setLogOut=()=>{
    setLoggedIn(false);
  }

  return (
    <>
    <AuthProvider value={{loggedIn,setLogIn,setLogOut}}>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index element={loggedIn?<Home />:<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
  </AuthProvider>
    </>
  )
}

export default App