import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";

const PostApproval = () => {
    const axiosPublic = useAxiosPublic();
    const [article, setArticle] = useState([]);
    useEffect(() => {
        axiosPublic.get("/articles?status=pending")
            .then(data => {
                setArticle(data.data);
            })
    })
    const handleApprove = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve this article?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(`approving ${id}`);
                axiosPublic.patch(`/approval/${id}`, { status: "approved" })
                    .then(data => {
                        if (data.data.modifiedCount) {
                            Swal.fire({
                                title: "Great!",
                                text: "The article has been approved.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleReject = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this article?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(`approving ${id}`);
                axiosPublic.patch(`/approval/${id}`, { status: "rejected" })
                    .then(data => {
                        if (data.data.modifiedCount) {
                            Swal.fire({
                                title: "Great!",
                                text: "The article has been rejected.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold">Pending Approval: {article.length}</h1>
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
                                    <th>Approve</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* rows  */}
                                {
                                    article.map((element, index) => <>
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
                                                        <div className="text-md">{element.author_name} - {element.author_email}</div>
                                                        <div className="text-sm opacity-50 capitalize">{element.type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="capitalize">
                                                {element.category}
                                            </td>
                                            <th className="flex gap-2">
                                                <button onClick={() => handleApprove(element._id)} className="btn btn-success"><Check></Check></button>
                                                <button onClick={()=> handleReject(element._id)} className="btn btn-error"><Close></Close></button>
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

export default PostApproval;