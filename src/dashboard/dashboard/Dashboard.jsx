import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import LoadingAnimation from "../../components/LoadingAnimation";

const Dashboard = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get(`/user/${user.email}`)
            .then(data => {
                setUserInfo(data.data)
            })
    }, [axiosPublic, user])

    // const {data:userInfo, isLoading} = useQuery({
    //     queryKey: "userInfo",
    //     queryFn: async()=>{
    //         const result = await axiosPublic.get(`http://localhost:3000/user/${user.email}`);
    //         return result?.data;
    //     }
    // })

    // if(isLoading){
    //     return <LoadingAnimation></LoadingAnimation>
    // }

    return (
        <div className="flex">
            <Helmet>
                <title>News Wave | Admin Panel</title>
            </Helmet>
            <div className="h-screen bg-gray-300 bg-opacity-40 p-4">
                <div>
                    <img src="https://i.ibb.co/BswPp3Q/Untitled-design.png" alt="" className="h-16" />
                </div>
                <div className="p-8 font-bold">
                <NavLink to='/' className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "underline font-bold" : ""
                }>Homepage</NavLink>
                </div>
                
                        <div className="p-8 flex flex-col gap-2">
                            
                            <NavLink to='/dashboard/manageusers' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "underline font-bold" : ""
                            }>All Users</NavLink>
                           
                            <NavLink to='/dashboard/manageall' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "underline font-bold" : ""
                            }> All Articles</NavLink>

                            <NavLink to='/dashboard/add-publisher' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "underline font-bold" : ""
                            }> Add Publisher</NavLink>

                            <NavLink to='/dashboard/postapproval' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "underline font-bold" : ""
                            }>Post Approval Requests</NavLink>
                            <NavLink to='/dashboard/authorrequest' className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "underline font-bold" : ""
                            }>Author Requests</NavLink>
                        </div>
                 
                <div className="divider"></div>
                <div className="p-8 flex flex-col gap-2">
                    <NavLink to='/dashboard/manage' className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "underline font-bold" : ""
                    }>Manage My Articles</NavLink>
                    <NavLink to='/dashboard/add' className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "underline font-bold" : ""
                    }>Add Articles</NavLink>

                </div>
            </div>

            <div className="flex-1 bg-base-100 m-10">
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;