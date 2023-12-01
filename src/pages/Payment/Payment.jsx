import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_payment);
const Payment = () => {
    

    return (
        <div>
            <Helmet>
                <title>Subscribe</title>
            </Helmet>
            <div className="">
                <h1 className="text-4xl font-bold text-center">Pay For Premium Subscriptions</h1>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;