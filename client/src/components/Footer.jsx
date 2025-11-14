import React from 'react'

function Footer() {
    return (
        <footer className="bg-black 
        text-white text-center py-5 absolute bottom-0 left-0 w-full">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} -  My fullstack Url shortening website. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer
