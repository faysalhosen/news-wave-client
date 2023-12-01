import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxios";
import { useEffect } from "react";


const DashboardHome = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get(`/user/${user.email}`)
            .then(data => {
                setUserInfo(data.data)
            })
    }, [axiosPublic, user, userInfo])
    const [myArticle, setMyArticle] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/myarticles?email=${user?.email}`)
            .then(data => {
                setMyArticle(data.data);
            }, []);
    })
    return (
        <div className="h-[75vh] flex flex-col justify-center items-center gap-5">
            <div>
                <h1 className="text-4xl font-bold">Welcome, {userInfo?.name} <span className="font-medium capitalize text-sm">{userInfo?.role}</span></h1>
            </div>
            <div>
                <h1 className="text-4xl font-bold">Your Posted Articles: {myArticle?.length}</h1>

            </div>
        </div>
    );
};

export default DashboardHome;