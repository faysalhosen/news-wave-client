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
        <div className="justify-center items-center">
            <h2 className="text-5xl m-16 text-center">All Publishers</h2>

            <div className=" m-12 flex-col justify-center items-center border-slate-200 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {
                    publisher.map((p) => (
                        <div key={p._id} className="flex flex-col gap-1 justify-center items-center">
                            <img className="items-center rounded-xl h-20" src={p?.image} alt="publisher image" />
                            
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Publishers;