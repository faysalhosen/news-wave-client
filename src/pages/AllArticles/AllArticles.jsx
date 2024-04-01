import ArticleCard from "./ArticleCard";
import useAxiosPublic from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

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
        <div className="text-center mb-12 ">
        <h2 className="text-center text-3xl font-medium mt-10 lg:ml-20"> All Article</h2>
        <div className="w-24 text-center lg:ml-20 h-1 rounded-full bg-blue inline-flex"></div>
        </div>
            <div className="flex relative  lg:ml-56 ">
            <FaSearch className=" absolute ml-20 mt-4"></FaSearch>
                <input type="text" placeholder="  Search by Title..." onChange={(e) => setSearchValue(e.target.value)} className=" w-full lg:w-3/4  mx-16 border-2 border-blue py-2 pl-8 px-4 rounded"  /> 
            </div>
            {
                isLoading ? <LoadingAnimation /> : <div className="grid grid-cols-1 md:grid-cols-2  gap-8 p-2 md:p-16">
                    {approvedArticle?.map(element => <ArticleCard key={element.id} articles={element}></ArticleCard>)}
                </div>
            }

        </>
    );
};

export default AllArticles;