import { useNavigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';

import { PillNav } from './index'
import logo from '/images/logo.png';

const Navbar = () => {

    const authStatus = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async() => {
        const response = await fetch('http://localhost:8000/user/logout', {
            method: 'POST',
            credentials: 'include' // include cookies in the request
        });

        if (response.ok) {
            console.log("User logged out successfully");
            authStatus.setLogOut();
            localStorage.removeItem("Bearer");
            navigate("/");
        } else {
            console.error("Error logging out user");
        }
    }

  return (
    <div className='display-flex justify-center align-middle'>
        <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
            { label: 'Home', href: '/' },
            { label : 'Profile', href: '/profile' },
            authStatus.loggedIn ? ({ label: 'Logout', onClick: handleLogout }) : ({ label: 'Login', href: '/login' }),
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="white"
        pillTextColor="#000000"
        />
    </div>
  )
}

export default Navbar
