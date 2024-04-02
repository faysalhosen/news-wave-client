import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import ArticleCard from "../AllArticles/ArticleCard";

const Premium = () => {
    const [premium, setPremium] = useState();

    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get("/posts")
            .then(data => setPremium(data.data))

    }, [axiosPublic])
    const premiumArticles = premium?.filter(element => element.type === "premium");
    // console.log(premiumArticles);
    return (
        <div>
            <div className="text-center my-12">
                <h1 className="text-4xl font-medium">Premium Articles</h1>
                <div className="w-24 text-center  h-1 rounded-full bg-blue inline-flex"></div>
            </div>
            <div>
                <h1 className="text-4xl font-medium text-center">{premiumArticles?.length} Premium Articles Are Available For You</h1>
            </div>
            {premiumArticles < 1 ? <div>Loading...</div> :
                <div className="grid grid-cols-1 md:grid-cols-1 gap-10 p-2 md:p-10">
                    {
                        premiumArticles?.map(element => <ArticleCard key={element._id} articles={element}></ArticleCard>)
                    }
                </div>
            }
        </div>
    );
};

export default Premium;