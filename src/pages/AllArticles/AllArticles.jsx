// import { useEffect } from "react";
// import { useState } from "react";
import ArticleCard from "./ArticleCard";
import useAxiosPublic from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import Loading from "../../../public/Loading.json"
import LoadingAnimation from "../../components/LoadingAnimation";
import { useState } from "react";

const AllArticles = () => {
    // const [article, setArticle] = useState([]);
    // useEffect(()=>{
    //     fetch("/posts.json")
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setArticle(data);
    //     })
    // },[])
    const [searchValue, setSearchValue] = useState('');
    console.log(searchValue)

    const axiosPublic = useAxiosPublic();
    // useEffect(() => {
    //     axiosPublic.get("/articles?status=approved")
    //         .then(data => {
    //             setArticle(data.data);
    //         })
    // }, [])

    const { data: approvedArticle, isLoading } = useQuery({
        queryKey: ["approvedArticle",searchValue],
        queryFn: async () => {
            const result = await axiosPublic.get(`/articles?status=approved&searchValue=${searchValue ? searchValue : ''}`)
            // .then(res=>res.data)
            return result?.data;
        }
    }
    )
    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <>
            <div>
                <input type="text" placeholder="search title"  onBlur={(e) => setSearchValue(e.target.value)} className="w-3/4 md:w-2/4 mx-auto   border border-slate-500 py-2 px-4 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-16">
                {approvedArticle?.map(element => <ArticleCard key={element.id} articles={element}></ArticleCard>)}
            </div>
        </>
    );
};

export default AllArticles;