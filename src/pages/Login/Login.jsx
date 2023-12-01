import { TextField } from "@mui/material";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxios";



const Login = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { login, googleLogin } = useAuth();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });
        login(email, password)
            .then(userCredentials => {
                console.log(userCredentials);
                if (userCredentials) {
                    form.reset();
                    navigate(location?.state ? location.state : '/')
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `Welcome, ${userCredentials.user.displayName}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                // console.log(err);
                if (err) {
                    // Swal.fire("", "Something went wrong!!!", "error");
                    if (err.code == "auth/invalid-login-credentials") {
                        Swal.fire("", "Email and Password Didn't Match", 'error')
                    } else {
                        // console.log(err.code)
                        Swal.fire("", "Something went wrong", 'error');
                    }
                }
            })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(userCredentials => {
                // console.log(userCredentials);
                if (userCredentials) {
                    navigate(location?.state ? location.state : '/')
                    const userInfo = {
                        name: userCredentials.user.displayName,
                        email: userCredentials.user.email,
                        role: 'user',
                        account_type: 'free',
                    }
                    // console.log(userInfo);
                    axiosPublic.post("/users", userInfo)
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `Welcome, ${userCredentials.user.displayName}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                // console.log(err);
                if (err) {
                    Swal.fire("", "Something went wrong!!!", "error")

                }
            })
    }
    return (

        <>
            <Helmet>
                <title>News Wave | Login</title>
            </Helmet>
            <div className="p-4 md:p-16 mt-24">
                <div></div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center max-w-md mx-auto gap-2">
                    <TextField name="email" type='email' id="outlined-basic" label="Email" variant="outlined" required />
                    <TextField name="password" type="password" id="outlined-basic" label="Password" variant="outlined" required />
                    <button type="submit" className="bg-gunblack text-white p-2 rounded-md">Login</button>
                </form>
                <div className="flex flex-col justify-center max-w-md mx-auto items-center gap-2">
                    <div className="divider" >Other Login Options</div>
                    <div className="flex gap-2">
                        <button onClick={handleGoogleLogin} className="btn text-lg rounded-full"><FaGoogle></FaGoogle></button>
                        <button className="btn text-lg rounded-full"><FaFacebook></FaFacebook></button>
                        <button className="btn text-lg rounded-full"><FaTwitter></FaTwitter></button>
                    </div>
                    <p>Don't Have An Account? <Link to='/register' className="font-bold text-gunblack">Register Now!</Link></p>
                </div>


            </div>
        </>
    );
};

export default Login;