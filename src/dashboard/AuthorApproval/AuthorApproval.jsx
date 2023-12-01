import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";


const AuthorApproval = () => {
    const axiosPublic = useAxiosPublic();
    const { data, refetch } = useQuery({

        queryKey: "authorApproval",
        queryFn: async () => {
            const result = await axiosPublic.get("/users");
            return result?.data;
        }
    })
    const pendingAuthors = data?.filter(element => element?.role == "pending author") || [];

    const handleMakeAuthor = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to approve ${user.name} as an author?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/user/${user._id}`,{role:"author"})
                .then(res=>{
                    // console.log(res.data);
                    if(res.data.modifiedCount){
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: `${user.name} has been approved as author.`,
                            showConfirmButton: false,
                            timer: 1500
                          });
                          refetch();
                    }
                })
              
            }
          });
    }

    // console.log(data);
    // console.log(pendingAuthors);

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold">Author Request: {pendingAuthors.length}</h1>
            </div>
            <div className="mt-24">
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
                                pendingAuthors?.map((element, index) => <>
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
                                            <button onClick={() => handleMakeAuthor(element)} disabled={element.role == "author"} className="btn btn-success">Approve</button>
                                        </td>

                                    </tr>
                                </>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuthorApproval;