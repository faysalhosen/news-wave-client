import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage/Homepage";
import AllArticles from "../pages/AllArticles/AllArticles";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Subscriptions from "../pages/Subscriptions/Subscriptions";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Add from "../pages/Add/Add";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../dashboard/dashboard/Dashboard";
import ArticleDetails from "../pages/AllArticles/ArticleDetails";
import MyArticles from "../pages/MyArticles/MyArticles";
import ManageArticles from "../dashboard/ManageArticles/ManageArticles";
import Update from "../dashboard/Update/Update";
import ManageAllArticles from "../dashboard/ManageArticles/ManageAllArticles";
import PostApproval from "../pages/PostApproval/PostApproval";
import ManageAllUsers from "../dashboard/ManageAllUsers/ManageAllUsers";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import AuthorRequest from "../pages/AuthorRequest/AuthorRequest";
import AuthorApproval from "../dashboard/AuthorApproval/AuthorApproval";
import Payment from "../pages/Payment/Payment";
import Premium from "../pages/Premium/Premium";
import AddPublisher from "../dashboard/AddPublisher/AddPublisher";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Homepage></Homepage>
            },
            {
                path: "/all",
                element: <AllArticles></AllArticles>
            },
            {
                path: "/article/:id",
                element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:3000/post/${params.id}`)
            },
            {
                path: "/subscriptions",
                element: <Subscriptions></Subscriptions>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/add",
                element: <PrivateRoute><Add></Add></PrivateRoute>
            },
            {
                path: "/myarticles",
                element: <MyArticles></MyArticles>,

            },
            {
                path: "/authorrequest",
                element:<AuthorRequest></AuthorRequest>
            },
            {
                path: "/payment",
                element: <Payment></Payment>
            },
            {
                path: "/premium",
                element: <Premium></Premium>
            }
            
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path: "/dashboard",
                element: <DashboardHome></DashboardHome>
            },
            {
                path: "/dashboard/manage",
                element: <ManageArticles></ManageArticles>,
            },
            {
                path: "/dashboard/add-publisher",
                element: <AddPublisher></AddPublisher>,
            },
            {
                path: "/dashboard/update/:id",
                element: <Update></Update>,
                loader: ({params})=>fetch(`http://localhost:3000/post/${params.id}`)
            },
            {
                path: "/dashboard/manageall",
                element: <ManageAllArticles></ManageAllArticles>
            },
            {
                path: "/dashboard/postapproval",
                element: <PostApproval></PostApproval>
            },
            {
                path: "/dashboard/manageusers",
                element: <ManageAllUsers></ManageAllUsers>
            },
            {
                path: "/dashboard/add",
                element: <Add></Add>,
            },
            {
                path: "/dashboard/authorrequest",
                element: <AuthorApproval></AuthorApproval>
            }
            
        ]
    }
])