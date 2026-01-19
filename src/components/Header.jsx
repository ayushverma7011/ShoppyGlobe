import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/ShoppyGlobe_logo.png";
import { IoSearchSharp } from "react-icons/io5"; 
import { BiSolidOffer, BiHelpCircle, BiUser, BiCartAlt } from "react-icons/bi";

function Header(){
    return(
        <div>
           <nav className= 'dark:bg-gray-900 text-white flex justify-between px-15 h-20 items-center'>
                <img 
                    className='h-16 w-auto object-contain mix-blend-screen scale-125' 
                    src={logo} 
                    alt="Logo" />
                
                <ul className= 'flex'>
                    <div className= 'flex m-4'>
                        <span className="mt-1"><IoSearchSharp /></span>
                        <Link><li className= 'px-2'>SEARCH</li></Link>
                    </div>
                    <div className= 'flex m-4'>
                        <span className="mt-1"><BiSolidOffer /></span>
                        <Link to='/offers'><li className= 'px-2'>OFFERS</li></Link>
                    </div>
                    <div className= 'flex m-4'>
                        <span className="mt-1"><BiSolidOffer /></span>
                        <Link to= '/help'><li className= 'px-2'>HELP</li></Link>
                    </div>
                    <div className= 'flex m-4'>
                        <span className="mt-1"><BiSolidOffer /></span>
                        <Link to= '/signin'> <li className= 'px-2'>SIGN IN</li> </Link>
                    </div>
                    <div className= 'flex m-4'>
                        <span className="mt-1"><BiSolidOffer /></span>
                        {/* <Link to= '/cart'><li className= 'px-2'>CART - {cartItems.length}</li></Link> */}
                    </div>
                </ul>
            </nav>
        </div>
    )
}
export default Header;