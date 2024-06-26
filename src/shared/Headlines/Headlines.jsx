import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


const Headlines = () => {
    const [headline, setHeadline] = useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_API_URL}/posts`)
        .then(res=>res.json())
        .then(data=>{
            setHeadline(data);
        })
    },[])
    return (
        <div className="flex pt-5 px-10">
           
            <p className="p-2 bg-red-600 text-white font-bold">Headlines</p>
            <Marquee className=" border border-red-600">
                {
                    headline.map(element=><p key={element.id} className="p-2 font-bold">{element.title},</p>)
                }
            </Marquee>
        </div>
    );
};

export default Headlines;