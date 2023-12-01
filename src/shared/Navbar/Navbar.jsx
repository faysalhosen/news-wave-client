
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxios';
import { useEffect } from 'react';


const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout()

    }
    const [userInfo, setUserInfo] = useState();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get(`/user/${user?.email}`)
            .then(data => {
                setUserInfo(data.data)
            })
    }, [axiosPublic, user?.email, userInfo])

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/all'>All Articles</NavLink></li>
        <li><NavLink to='/subscriptions'>Subscription</NavLink></li>
        <li><NavLink to='/add' className={user ? "" : "hidden"}>Add Articles</NavLink></li>
        <li><NavLink to='/myarticles' className={user ? "" : "hidden"}>My Articles</NavLink></li>
        <li><NavLink to='/authorrequest' className={user ? "" : "hidden"}>Become An Author</NavLink></li>
        <li><NavLink to='/dashboard' className={user ? "" : "hidden"}>Dashboard</NavLink></li>
        <li><NavLink to='/premium' className={user ? "" : "hidden"}>Premium Articles</NavLink></li>

    </>

    return (
        <div className='bg-white mb-24'>
            <div className="navbar bg-base-100 fixed z-10 top-0 shadow-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <NavLink>
                        <img src="https://i.ibb.co/BswPp3Q/Untitled-design.png" alt="Logo" className='h-16 hidden md:block' />
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt={user.displayName} src={user.photoURL} />
                                    </div>
                                </div>
                                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
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
                            <NavLink to='/login' className="btn btn-sm bg-gunblack text-white">Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;