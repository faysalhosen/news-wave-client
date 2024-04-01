import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxios";
import ArticleCard from "../AllArticles/ArticleCard";
import { Link } from "react-router-dom";

const MyArticles = () => {
    const {user} =  useAuth();
    const axiosPublic = useAxiosPublic();
    const [myArticle, setMyArticle] = useState([]);
  
    useEffect(() => {
        axiosPublic.get(`/myarticles?email=${user?.email}`)
            .then(data => {
                setMyArticle(data.data);
            });
    }, [user, axiosPublic]);


    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-medium">My Articles</h2>
            <div className="w-24 text-center  h-1 rounded-full bg-blue inline-flex"></div>
            </div>
            <h2 className="text-4xl font-semibold text-center p-2">Welcome {user.displayName}, You've published {myArticle.length} article(s)</h2>
            <div className="divider max-w-6xl mx-auto"></div>
            <div className="flex justify-center p-2">
            <Link to='/dashboard/manage' className="text-center px-1 py-2 bg-gunblack text-white rounded-md hover:bg-opacity-80 duration-300">Manage Your Articles</Link>
            </div>
            <div className="grid grid-cols-2 gap-5 p-4">
                {
                    myArticle.map(element=><ArticleCard key={element._id} articles={element}></ArticleCard>)
                }
            </div>
        </div>
    );
};

export default MyArticles;