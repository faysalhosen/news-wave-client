import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const amount = 15;

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price: amount })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        console.log(error)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            // console.log(confirmError);
        }
        console.log('payment Intent', paymentIntent);

        if (paymentIntent.status === 'succeeded') {

            if (paymentMethod) {
                // console.log(paymentMethod);
                axiosPublic.patch(`/premiumuser/${user.email}`, { account_type: "premium" })
                setError("");
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Congratulations! Now you're our premium user.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/")
            }
        }

        // console.log('card', card)
    }


    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col justify-center">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                >

                </CardElement>
                <button type="submit" className="btn w-1/4 mt-5 mx-auto btn-sm  btn-success" disabled={!stripe}>Pay</button>
                <p className="mt-2 text-red-600 text-center text-sm">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;