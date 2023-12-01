import Lottie from "lottie-react";
import ErrorAnimation from "../../../public/ErrorPage.json"
import { Link } from "react-router-dom";
const ErrorPage = () => {
    return (
        <div>
            <Lottie  className="h-[70vh]" animationData={ErrorAnimation}></Lottie>
            <div className="flex justify-center items-center">
            <Link to='/' className="text-blue border-2 border-gunblack px-4 py-1 rounded-md hover:text-white hover:bg-gunblack duration-300">Go To Homepage</Link>
            </div>
        </div>
    );
};

export default ErrorPage;