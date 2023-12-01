import Lottie from "lottie-react";
import Loading from "../../public/Loading.json"

const LoadingAnimation = () => {
    return (
        <div>
            <Lottie animationData={Loading}  className="h-[75vh]"></Lottie>
        </div>
    );
};

export default LoadingAnimation;