
import {  NavLink } from 'react-router-dom';


import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxios';
import { useEffect } from 'react';



const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout()

    }
    
const [userInfo, setUserInfo] = useState(null);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get(`/user/${user?.email}`)
            .then(data => {
                setUserInfo(data.data)
            })
    }, [axiosPublic, user?.email])

    const links = <>
        <li><NavLink to='/' className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue " : "" }>Home</NavLink></li>
       <li> <NavLink to='/all' className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" }>All Articles</NavLink> </li>
        <li  className={user ? "" : "hidden"}><NavLink to='/subscriptions'  className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" }>Subscription</NavLink></li>
        <li  className={user ? "" : "hidden"} ><NavLink to='/add'  className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" } >Add Articles</NavLink></li>
        <li  className={user ? "" : "hidden"}><NavLink to='/myarticles'className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" } >My Articles</NavLink></li>
        <li  className={user ? "" : "hidden"}><NavLink to='/authorrequest' className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" } >Become An Author</NavLink></li>
        <li  className={user ? "" : "hidden"}><NavLink to='/dashboard' className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" } >Dashboard</NavLink></li>
        <li  className={user ? "" : "hidden"}><NavLink to='/premium' className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? "underline font-bold text-blue" : "" }>Premium Articles</NavLink></li>

    </>

    return (
        <div className='mb-24  x-10 '>
              <div className='flex items-center justify-between relative'>
                   
            <div className="navbar bg-base-100 fixed z-10 top-0 shadow-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className=" text-center py-4 dropdown-content ml-12 z-[1]  bg-base-100 rounded-box w-32">
                            {   	
                                links
                            }
                        </ul>
                    </div>
                    <NavLink className="pl-4 ">
                        <img src="https://i.ibb.co/BswPp3Q/Untitled-design.png" alt="Logo" className='h-16 hidden md:block' />
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="gap-3 text-center pl-32 menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
          
                <div className="navbar-end mr-10">
                    
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt={user.displayName} src={user.photoURL} />
                                    </div>
                                </div>
                                <ul className=" menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                                    <li>
                                        <a className="justify-between font-bold">
                                            {user.displayName}
                                            <span className="badge text-xs font-normal p-4 capitalize bg-gunblack text-white">{userInfo?.account_type} User</span>
                                        </a>
                                    </li>

                                    <li><button onClick={() => handleLogout()}>Logout</button></li>
                                </ul>
                            </div>
                            :
                            <NavLink to='/login'>Login</NavLink>
                    }
                </div>
            </div>
        </div>
        </div>
    );
};

export default Navbar;