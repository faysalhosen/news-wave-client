import { MenuItem, TextField } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";

const Add = () => {

    // traditional form system
    // const handleAddArticle = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const title = form.title.value;
    //     const category = form.category.value;
    //     const article = form.article.value;
    //     const image = form.image.value;
    //     const imageFile = { image }
    //     console.log({ title, category, article, imageFile });
    // }
    const {user} = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image}`
    const addArticle = async (data) => {
        const title = data.title;
        const category = data.category;
        const article = data.article;
        const type = data.type;
        const image = data.image[0];
        const imageFile = { image };
        const author_name = user?.displayName;
        const author_email = user?.email;
        const author_img = user?.photoURL;
        const status = "pending";
        
        const res = await axios.post(imageAPI, imageFile, {
            headers: {
                
                "content-type": "multipart/form-data"
            }
        })
        // console.log(res);
        const photoURL = res.data.data.display_url;
        // console.log(photoURL);
        const articleDetails = {title, category, article, photoURL, type, author_name, author_email, author_img, status, views: (Math.floor(Math.random()*9000)+1000)}
        console.log(articleDetails);
        axiosPublic.post("/posts", articleDetails)
        .then(data=>{
            // console.log(data);
            if(data.data.insertedId){
                Swal.fire("Great", "Your article has been added to the queue. Please wait for approval.", "success");
                reset();
            }
        })


    }

    const categories = [
        {
            value: 'politics',
            label: 'Politics',
        },
        {
            value: 'technology',
            label: 'Technology',
        },
        {
            value: 'sports',
            label: 'Sports',
        },
        {
            value: 'health',
            label: 'Health',
        },
        {
            value: 'business',
            label: 'Business',
        },
        {
            value: 'entertainment',
            label: 'Entertainment',
        },
        {
            value: 'science',
            label: 'Science',
        },
        {
            value: 'travel',
            label: 'Travel',
        },
        {
            value: 'culture',
            label: 'Culture',
        },
        {
            value: 'environment',
            label: 'Environment',
        },
        {
            value: 'education',
            label: 'Education',
        },
        {
            value: 'food',
            label: 'Food',
        },
        {
            value: 'others',
            label: 'Others',
        },
    ];
    const type = [
        {
            value: "free",
            label: "Free",
        },
        {
            value: "premium",
            label: "Premium"
        }
    ]
    return (
        <div className="p-2">
            <Helmet>
                <title>News Wave | Add Articles</title>
            </Helmet>
            <h1 className="text-center text-4xl font-bold p-5">Add Articles</h1>
            <form onSubmit={handleSubmit(addArticle)} className="max-w-lg mx-auto space-y-2">
                <div className="flex justify-between">
                    <TextField name="title" id="outlined-basic" label="Article Title" variant="outlined" {...register("title")} />
                    {/* <TextField id="outlined-basic" label="Category" variant="outlined" /> */}
                    <TextField
                        name="category"
                        id="outlined-select-currency"
                        select
                        label=""
                        defaultValue="technology"
                        helperText=""
                        {...register("category")}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="type"
                        id="outlined-select-currency"
                        select
                        label=""
                        defaultValue="free"
                        helperText=""
                        {...register("type")}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div>
                    <TextField
                        name="article"
                        id="outlined-multiline-static"
                        label="Full Article"
                        multiline
                        rows={5}
                        className="w-full"
                        {...register("article")}
                    // defaultValue="Default Value"
                    />
                </div>
                <div>
                    <input name='image' {...register("image")} type="file" className="file-input file-input-bordered file-input-gunblack w-full" required/>
                </div>
                <input className="btn w-full bg-gunblack text-white hover:bg-white hover:text-gunblack" type="submit" value="Add Article" />


            </form>
        </div>
    );
};

export default Add;