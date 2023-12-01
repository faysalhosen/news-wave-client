import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Headlines = () => {
    const [headline, setHeadline] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/posts")
        .then(res=>res.json())
        .then(data=>{
            setHeadline(data);
        })
    },[])
    return (
        <div className="flex pt-5 px-4">
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