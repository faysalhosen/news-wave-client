import ArticleCard from "./ArticleCard";
import useAxiosPublic from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useState } from "react";

const AllArticles = () => {

    const [searchValue, setSearchValue] = useState('');
    //console.log(searchValue)

    const axiosPublic = useAxiosPublic();

    const { data: approvedArticle, isLoading } = useQuery({
        queryKey: ["approvedArticle", searchValue],
        queryFn: async () => {
            const result = await axiosPublic.get(`/articles?searchValue=${searchValue ? searchValue : ''}`)
            // .then(res=>res.data)
            return result?.data;
        }
    }
    )

    return (
        <>
            <div className="flex items-center justify-center">
                <input type="text" placeholder="Search by Title..." onChange={(e) => setSearchValue(e.target.value)} className="w-3/4 md:w-2/4 ml-16 border border-slate-800 py-2 px-4 rounded" />
            </div>
            {
                isLoading ? <LoadingAnimation /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2 md:p-16">
                    {approvedArticle?.map(element => <ArticleCard key={element.id} articles={element}></ArticleCard>)}
                </div>
            }

        </>
    );
};

export default AllArticles;