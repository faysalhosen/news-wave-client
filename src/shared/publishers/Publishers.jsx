import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";


const Publishers = () => {
    const axiosPublic = useAxiosPublic();

    const [publisher, setPublisher] = useState([]);
    useEffect(() => {
        axiosPublic.get("/publishers")
            .then(data => {
                console.log(data)
                setPublisher(data.data)
            })
    }, [axiosPublic])

    return (
        <div>
            <h2 className="text-3xl text-center">All Publishers</h2>

            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {
                    publisher.map((p) => (
                        <div key={p._id} className="felx flex-col gap-1 items-center">
                            <img src={p?.image} alt="publisher image" />
                            <h3>{p?.name}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Publishers;
