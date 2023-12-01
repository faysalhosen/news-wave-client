import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {

    const {_id, title, category, article, type:article_type, photoURL} = useLoaderData();

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
    const navigate = useNavigate();
    const {user} = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image}`
    const updateArticle = async (data) => {
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
        const articleDetails = {title, category, article, photoURL, type, author_name, author_email, author_img, status}
        // console.log(articleDetails);
        axiosPublic.patch(`/posts/${_id}`, articleDetails)
        .then(data=>{
            // console.log(data);
            if(data.data.modifiedCount){
                Swal.fire("Great", "Your article has been added updated.", "success");
                reset();
                navigate("/dashboard/manage")
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
            
            <h1 className="text-4xl font-bold">Update Article</h1>
            <form onSubmit={handleSubmit(updateArticle)} className="max-w-lg mt-10 space-y-2">
                <div className="flex justify-between">
                    <TextField defaultValue={title} name="title" id="outlined-basic" label="Article Title" variant="outlined" {...register("title")} />
                    {/* <TextField id="outlined-basic" label="Category" variant="outlined" /> */}
                    <TextField
                        name="category"
                        id="outlined-select-currency"
                        select
                        label=""
                        defaultValue={category}
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
                        defaultValue={article_type}
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
                    defaultValue={article}
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
                    <input name='image' {...register("image")} type="file" className="file-input file-input-bordered file-input-gunblack w-full" required />
                </div>
                <input className="btn w-full bg-gunblack text-white hover:bg-white hover:text-gunblack" type="submit" value="Update" />


            </form>
        </div>
    );
};

export default Update;