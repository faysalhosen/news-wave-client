import { TextField } from "@mui/material";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxios";



const Register = () => {

    const axiosPublic = useAxiosPublic();
    
    const navigate = useNavigate();
    
    const { registerUser, googleLogin } = useAuth();
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const name = form.name.value;
    //     const image = form.image.value;
    //     console.log({ email, password,name,image });
    // }

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // user registration
    const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image}`
    const handleUserRegistration = async (data) => {
        const email = data.email;
        const name = data.name;
        const password = data.password;
        const image = data.image[0];
        const imageFile = { image }
        console.log({ email, name, password, image });
        console.log(imageFile);
        axios.post(imageAPI, imageFile)

        const res = await axios.post(imageAPI, imageFile, {
            headers: {

                "content-type": "multipart/form-data"
            }
        })
        // console.log(res);
        const photoURL = res.data.data.display_url;
        registerUser(email, password, name, photoURL)
            .then(userCredentials => {
                // console.log(userCredentials);
                if(userCredentials){
                    const userInfo = {
                        name,
                        email,
                        role: 'user',
                        account_type: 'free',
                    }
                    // axiosPublic.post()
                    console.log(userInfo);
                    axiosPublic.post("/users", userInfo)
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "User Registered Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    navigate("/login");
                }
                
            })
            .catch(err => {
                console.log(err);
            })


    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(userCredentials => {
                // console.log(userCredentials);
                if(userCredentials){
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
                    navigate("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (

        <>
        <Helmet>
            <title>News Wave | User Registration</title>
        </Helmet>
            <div className="p-4 md:p-16 mt-24">
                <div></div>
                <form onSubmit={handleSubmit(handleUserRegistration)} className="flex flex-col justify-center max-w-md mx-auto gap-2">
                    <TextField {...register("name")} name="name" id="outlined-basic" label="Name" variant="outlined" required />
                    <TextField {...register("email")} name="email" type="email" id="outlined-basic" label="Email" variant="outlined" required />
                    <TextField {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/
                    })} name="password" id="outlined-basic" label="Password" variant="outlined" type="password" required />
                    {errors.password?.type === "minLength" && <p className="text-red-600">Password must be six characters</p>}
                    {errors.password?.type === "maxLength" && <p className="text-red-600">Password can't exceed 20 characters</p>}
                    {errors.password?.type === "pattern" && <p className="text-red-600">Password must contain an uppercase, a lowercase and a special character</p>}
                    <input {...register("image")} name="image" type="file" className="file-input file-input-bordered file-input-gunblack w-full" required />
                    <button type="submit" className="bg-gunblack text-white p-2 rounded-md">Register</button>
                </form>
                <div className="flex flex-col justify-center max-w-md mx-auto items-center gap-2">
                    <div className="divider" >Other Login Options</div>
                    <div className="flex gap-2">
                        <button onClick={handleGoogleLogin} className="btn text-lg rounded-full"><FaGoogle></FaGoogle></button>
                        <button className="btn text-lg rounded-full"><FaFacebook></FaFacebook></button>
                        <button className="btn text-lg rounded-full"><FaTwitter></FaTwitter></button>
                    </div>
                    <p>Already Registered? <Link to='/login' className="font-bold text-gunblack">Login Now!</Link></p>
                </div>


            </div>
        </>
    );
};

export default Register;