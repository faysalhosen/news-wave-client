import { useLoaderData } from "react-router-dom";


const ArticleDetails = () => {
    const { _id, title, category, article, photoURL, type, author_name, author_email, author_img, status } = useLoaderData();
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <img className="object-cover object-center h-full w-full" src={photoURL} />
                        </div>
                        <div className="flex flex-col sm:flex-row mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <img src={author_img} alt="" className="rounded-full w-36 h-36" />
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{author_name}</h2>
                                    <h1>Author</h1>
                                    <div className="w-12 h-1 bg-gunblack rounded mt-2 mb-1"></div>
                                    <p className="text-base">{author_email}</p>
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <h1 className="font-bold text-4xl font-quatsans">{title}</h1>
                                <div className="flex gap-2">
                                    <p className="capitalize badge badge-success">{type} Article</p>
                                    <p className="capitalize badge badge-success">{category}</p>
                                </div>
                                <p className="leading-relaxed text-lg mb-4 font-quat">{article}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ArticleDetails;