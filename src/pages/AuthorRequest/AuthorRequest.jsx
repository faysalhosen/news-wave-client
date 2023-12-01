import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AuthorRequest = () => {
    const { user: firebaseUser } = useAuth();
    const [user, setUser] = useState();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get(`/user/${firebaseUser?.email}`)
            .then(data => {
                setUser(data.data)
            })
    }, [axiosPublic, firebaseUser, user])

    const handleRequest = id =>{
        // console.log(`author request for ${id}`);
        axiosPublic.patch(`/user/${id}`, {role:"pending author"})
        .then(data=>{
            if(data.data.modifiedCount){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your request has been sent. Wait for admin approval",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    return (
        <div className="flex flex-col gap-5 justify-center items-center mt-24 h-[50vh]">
            <h1 className="md:text-4xl font-bold">After the admin approval, You can post your articles</h1>
            <div className="divider p-4 m-4">Your Info</div>
            <div>
                <p>ID: {user?._id?.slice(0,4)}</p>
                <p>Name: {user?.name}</p>
                <p className="capitalize">User Type: {user?.account_type}</p>
                <p className="capitalize">Role: {user?.role}</p>
            </div>
            <div className="divider p-4 m-4">Request to become an author</div>
            {
                user?.role === "pending author"?
                <p>Your request has been sent. Please wait for admin approval.</p>
                :
                <button className="btn bg-gunblack text-white hover:bg-black" onClick={() => handleRequest(user?._id)}>Request to become an author</button>
            }
        </div>
    );
};

export default AuthorRequest;