import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import logo from "../assets/images/ShoppyGlobe_logo.png";
import { IoSearchSharp } from "react-icons/io5"; 
import { BiSolidOffer, BiHelpCircle, BiUser, BiCartAlt } from "react-icons/bi";

function Header() {
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div>
            <nav className='dark:bg-gray-900 text-white flex justify-between px-10 h-20 items-center'>
                <Link to="/"> 
                    <img 
                        className='h-16 w-auto object-contain mix-blend-screen scale-125' 
                        src={logo} 
                        alt="Logo" />
                </Link>
                
                <ul className='flex'>
                    <div className='flex m-4 items-center'>
                        <span className="mt-1"><IoSearchSharp /></span>
                        <Link to="/search"><li className='px-2'>SEARCH</li></Link>
                    </div>

                    <div className='flex m-4 items-center'>
                        <span className="mt-1"><BiSolidOffer /></span>
                        <Link to='/offers'><li className='px-2'>OFFERS</li></Link>
                    </div>

                    <div className='flex m-4 items-center'>
                        <span className="mt-1"><BiHelpCircle /></span> 
                        <Link to='/help'><li className='px-2'>HELP</li></Link>
                    </div>

                    <div className='flex m-4 items-center'>
                        <span className="mt-1"><BiUser /></span> 
                        <Link to='/signin'><li className='px-2'>SIGN IN</li></Link>
                    </div>

                    <div className='flex m-4 items-center'>
                        <span className="mt-1 text-xl text-yellow-400"><BiCartAlt /></span> 
                        <Link to='/cart'>
                            <li className='px-2 font-bold'>
                                CART ({cartItems.length}) 
                            </li>
                        </Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
}

export default Header;