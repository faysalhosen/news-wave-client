import { Helmet } from "react-helmet-async";
import Footer from "../../shared/Footer/Footer";
import Headlines from "../../shared/Headlines/Headlines";
import Hero from "../../shared/Hero/Hero";
import Features from "../Features/Features";
import Subscriptions from "../Subscriptions/Subscriptions";
import AllArticlesHome from "../AllArticles/AllArticlesHome";


const Homepage = () => {
    return (
        <div>
            <Helmet>
                <title>News Wave | Home</title>
            </Helmet>
            
            <Hero></Hero>
            <Headlines></Headlines>
            <AllArticlesHome></AllArticlesHome>
            <Subscriptions></Subscriptions>
            <Features></Features>
            
            <Footer></Footer>
            
        </div>
    );
};

export default Homepage;