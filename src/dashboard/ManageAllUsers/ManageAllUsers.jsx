import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";


const ManageAllUsers = () => {
    const [users, setUsers] = useState();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/users")
            .then(data => {
                setUsers(data.data)
            })
        }, [axiosPublic,users])

        // handle make admin
        const handleMakeAdmin = user =>{
            Swal.fire({
                title: "Are you sure?",
                text: `Do you really want to promote ${user.name} as an admin?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Confirm!"
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/user/${user._id}`,{role:"admin"})
                    .then(res=>{
                        // console.log(res.data);
                        if(res.data.modifiedCount){
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `${user.name} has been promoted to admin`,
                                showConfirmButton: false,
                                timer: 1500
                              });
                        }
                    })
                  
                }
              });
        }

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold">Total Users: {users?.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>User Type</th>
                            <th>Make Admin</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* rows  */}
                        {
                            users?.map((element, index) => <>
                                <tr>
                                    <th>
                                        <label>
                                            <p className="font-bold">{index + 1}</p>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold text-lg">{element.name}</div>
                                                <div className="text-sm opacity-50 capitalize">{element.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="capitalize">
                                        {element.role}
                                    </td>
                                    <td className="capitalize">
                                        {element.account_type}
                                    </td>
                                    <td>
                                        <button onClick={()=>handleMakeAdmin(element)} disabled={element.role == "admin"} className="btn btn-success">Make Admin</button>
                                    </td>

                                </tr>
                            </>)
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageAllUsers;