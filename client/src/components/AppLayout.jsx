import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { DarkVeil } from './index';

function AppLayout() {
  return (
    <>
        <div className=''>
          <div style={{width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <DarkVeil />
          </div>
          <main style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
            <Navbar/>
            <Outlet />
            <Footer/>
          </main>
        </div>
    </>
  )
}

export default AppLayout
