import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements,PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import useAxios from '../hooks/useAxios';

const stripePromise = loadStripe("pk_test_51PNslyRu20g9BDQ6EP1sOdhVVaoYB9NdGR4f910yxhq44orLZmg3DYD6zzYSI2PWcVFMyYiKtCQnbflFZa0006TX00CyIdkzAG");

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentRequest, setPaymentRequest] = useState(null);

    const axios = useAxios()



    const createPaymentIntent = async () => {
        try {
            const response = await axios.post('users/create-payment-intent', {
                amount: 5000,
                currency: 'inr' // Amount in cents
            });
            setClientSecret(response.data.data.client_secret);

            console.log(response.data.data);
        } catch (error) {
            console.error('Error creating payment intent', error);
        }
    };

    useEffect(() => {
        createPaymentIntent();
    }, []);


    useEffect(()=>{
        if(stripe && clientSecret) {
            const pr = stripe.paymentRequest({
                country: 'IN',
                currency: 'inr',
                total: {
                    label: 'Total',
                    amount: 5000,
                },

                requestPayerName: true,
                requestPayerEmail: true

            })

            const options = {
                layout: {
                    type: 'tabs',
                    defaultCollapsed: false
                }
            }

            pr.canMakePayment()
            .then((res) => {
                if(res) {
                    setPaymentRequest(pr)
                }
            })


            pr.on('paymentmethod', async (ev) => {
                const {error, paymentIntent} = await stripe.confirmPayment(
                    clientSecret, {
                        payment_method: ev.paymentMethod.id
                    },
                    {handleActions: false}
                )


                if(error){
                    ev.complete('fail')
                }
                else {
                    ev.complete('success')
                    if(paymentIntent.status === 'requires_action') {
                        stripe.confirmCardPayment(clientSecret)
                    }
                }
            })




        }
    }, [stripe, clientSecret])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            setError(null);
            setSuccess(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
            setProcessing(false);
        }
    };


    const cardElementOptions = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
        hidePostalCode: true,
        iconStyle: 'solid',

    }
  

    return (
        <div className="payment-form">
            <h2>Complete Your Purchase</h2>
            {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
            <form onSubmit={handleSubmit}>
                <CardElement options={cardElementOptions} />
                <button type="submit" disabled={processing || !stripe || !elements}>
                    {processing ? 'Processing...' : 'Pay Now'}
                </button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
    );
};

const StripePayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripePayment;
