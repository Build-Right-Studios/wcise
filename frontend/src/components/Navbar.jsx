import React, { useState } from 'react'
import { RiMenu3Fill } from "react-icons/ri";
import wcise_logo from '../images/wcise_logo.png';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Navbar Desktop & Mobile Toggle */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    {/* Logo Section */}
                    <div>
                        <Link to='/'><img src={wcise_logo} alt="WCISE Logo" className='h-16 w-auto px-2' /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:block mr-2'>
                        <ul className='flex items-center gap-6 text-gray-700 font-medium'>
                            <NavLink to="/call-for-papers" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">CALL FOR PAPERS</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to="/committee" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">COMMITTEE</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to="/submissions" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">SUBMISSIONS</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to="/registration" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">REGISTRATION</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            {/* <NavLink to="/technical-workshop" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">TECHNICAL WORKSHOP</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink> */}
                            <NavLink to="/keynote" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">KEYNOTE</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to="/previous-events" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">PREVIOUS EVENTS</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to="/awards" className="relative inline-block py-1 px-1 text-gray-800 font-semibold group">
                                <span className="relative z-10 group-hover:text-blue-500 transition">AWARDS</span>
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full rounded"></span>
                            </NavLink>
                            <NavLink to='/login' className="inline-block px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-blue-500 hover:text-white transition">
                                LOGIN
                            </NavLink>
                        </ul>
                    </div>

                    {/* Mobile Icon */}
                    <div className='md:hidden' onClick={() => setOpen(!open)}>
                        <RiMenu3Fill className='text-3xl' />
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {open && (
                <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col gap-4 px-6 py-8 shadow-lg">
                    <button
                        className="self-end text-2xl mb-4"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>
                    <NavLink to="/call-for-papers" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">CALL FOR PAPERS</NavLink>
                    <NavLink to="/committee" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">COMMITTEE</NavLink>
                    <NavLink to="/submissions" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">SUBMISSIONS</NavLink>
                    <NavLink to="/registration" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">REGISTRATION</NavLink>
                    <NavLink to="/technical-workshop" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">TECHNICAL WORKSHOP</NavLink>
                    <NavLink to="/keynote" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">KEYNOTE</NavLink>
                    <NavLink to="/previous-events" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">PREVIOUS EVENTS</NavLink>
                    <NavLink to="/awards" onClick={() => setOpen(false)} className="text-gray-800 font-medium py-2 border-b hover:text-blue-500 transition">AWARDS</NavLink>
                    <NavLink to="/login" onClick={() => setOpen(false)} className="inline-block w-fit px-4 py-2 mt-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-blue-500 hover:text-white transition">LOGIN</NavLink>
                </div>
            )}
        </>
    );
}

export default Navbar;
