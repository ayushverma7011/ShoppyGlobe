import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import logo from "../assets/images/ShoppyGlobe_logo.png";
import { IoSearchSharp } from "react-icons/io5"; 
import { BiUser, BiCartAlt } from "react-icons/bi";
import { toggleSearch } from '../utils/cartSlice';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

function Header() {
    
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const handleSearchClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        navigate('/'); // Go back to the product list page
        dispatch(toggleSearch()); // Show/Hide the bar
    };

    return (
        <div>
            <nav className='dark:bg-gray-900 text-white flex justify-between px-10 h-20 items-center'>
                <Link to="/"> 
                    <img 
                        className='h-16 w-auto object-contain mix-blend-screen scale-125' 
                        src={logo} 
                        alt="Logo" />
                </Link>
                
                <ul className='flex items-center space-x-6'>
                    {/* ✅ Search Toggle Button */}
                    <li 
                        onClick={handleSearchClick}
                        className='flex items-center cursor-pointer hover:text-indigo-400 transition-colors group'
                    >
                        <IoSearchSharp className="text-xl group-hover:scale-110 transition-transform" />
                        <span className='px-2 font-medium'>SEARCH</span>
                    </li>

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