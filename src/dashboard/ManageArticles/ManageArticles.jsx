import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Delete, Update } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageArticles = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [myArticle, setMyArticle] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/myarticles?email=${user?.email}`)
            .then(data => {
                setMyArticle(data.data);
            }, []);
    })

    const handleUpdate = () => {
        console.log("Update");
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log("Delete Operation Triggered", id);
                axiosPublic.delete(`/posts/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Total Articles: {myArticle.length}</h1>
                <h1 className="text-4xl font-bold">Author: {user.displayName}</h1>
            </div>
            <div>
                <div className="p-10">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        Index
                                    </th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* rows  */}
                                {
                                    myArticle.map((element, index) => <>
                                        <tr>
                                            <th>
                                                <label>
                                                    <p className="font-bold">{index + 1}</p>
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-16 h-16">
                                                            <img src={element.photoURL} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg">{element.title}</div>
                                                        <div className="m-2 text-sm opacity-70 capitalize">{element.type} <span className={`border border-black p-1 rounded-md ${element.status == "approved"? "bg-green-500": "bg-yellow-500"} ${element.status == "rejected"? "bg-red-500": "bg-yellow-500"}`}>{element.status}</span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="capitalize">
                                                {element.category}
                                            </td>
                                            <th className="flex gap-2">
                                                <Link to={`/dashboard/update/${element._id}`} className="btn rounded-full btn-success" onClick={() => handleUpdate()}>
                                                    <Update></Update>
                                                </Link>
                                                <button className="btn rounded-full btn-error" onClick={() => handleDelete(element._id)}>
                                                    <Delete></Delete>
                                                </button>
                                            </th>
                                        </tr>
                                    </>)
                                }


                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageArticles;