// import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth";
// import Loading from "../../public/Loading.json"
import { Navigate, useLocation } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <LoadingAnimation></LoadingAnimation>
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
    
};

export default PrivateRoute;