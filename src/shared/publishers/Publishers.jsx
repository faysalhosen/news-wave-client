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
        <div className=" justify-center items-center">
            <div className="text-center mt-24">
            <h2 className="text-4xl mb-5  text-center">All Publishers</h2>
            <div className="w-24 text-center mb-20  h-1 rounded-full bg-blue inline-flex"></div>
            </div>

           <div>
             <div className=" mx-10  grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
                {
                    publisher.map((p) => (
                        <div key={p._id} className="flex flex-col  border-2 border-gray-300 gap-1  justify-center items-center">
                            <img className="items-center  w-full h-12 " src={p?.image} alt="publisher image" />
                            
                        </div>
                    ))
                }
            </div>
           </div>
        </div>
    );
};

export default Publishers;
