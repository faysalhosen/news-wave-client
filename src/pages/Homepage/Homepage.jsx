import { Helmet } from "react-helmet-async";
import Footer from "../../shared/Footer/Footer";
import Headlines from "../../shared/Headlines/Headlines";
import Hero from "../../shared/Hero/Hero";
import Features from "../Features/Features";
import Subscriptions from "../Subscriptions/Subscriptions";
import AllArticlesHome from "../AllArticles/AllArticlesHome";
import Publishers from "../../shared/publishers/Publishers";
import GetOurUpdates from "../GetOurUpdates/GetOurUpdates";


const Homepage = () => {
    return (
        <div>
            <Helmet>
                <title>News Wave | Home</title>
            </Helmet>

            <Hero></Hero>
            <Headlines></Headlines>
            <Publishers></Publishers>
            <AllArticlesHome></AllArticlesHome>
            <Subscriptions></Subscriptions>
            <Features></Features>
            <GetOurUpdates></GetOurUpdates>
             <Footer></Footer>

        </div>
    );
};

export default Homepage;