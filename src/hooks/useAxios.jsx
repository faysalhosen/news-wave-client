import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://news-wave-server.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;