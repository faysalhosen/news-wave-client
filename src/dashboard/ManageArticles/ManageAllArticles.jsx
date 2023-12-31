import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageAllArticles = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [myArticle, setMyArticle] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/posts`)
            .then(data => {
                setMyArticle(data.data);
            }, []);
    })

    const refetchData = () => {
        axiosPublic.get(`/posts`)
            .then(data => {
                setMyArticle(data.data);
            }, []);
    }

    const handleUpdate = () => {
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
                            refetchData();
                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Total Articles: {myArticle.length}</h1>
                <h1 className="text-4xl font-bold">Admin: {user.displayName}</h1>
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
                                    <th>Status</th>
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
                                                        <div className="text-sm opacity-50 capitalize">{element.type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="capitalize">
                                                {element.status}
                                            </td>
                                            <td className="capitalize">
                                                {element.category}
                                            </td>
                                            <th className="flex gap-2">
                                                <Link to={`/dashboard/update/${element._id}`} className="btn text-white rounded-full btn-success" onClick={() => handleUpdate()}>
                                                    Edit
                                                </Link>

                                                <button className="btn text-white rounded-full btn-error" onClick={() => handleDelete(element._id)}>
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

export default ManageAllArticles;