'use client'

import React from 'react'
import Script from "react-load-script";
import CheckOutWithCreditCard from "./CheckOutWithCreditCard"

let OmiseCard

const CheckOut = ({ totalPrice, movie_id, reserveSeat }) => {

    let amount = totalPrice * 100

    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
            currency: 'THB',
            frameLabel: 'Ticket Shop',
            submitLabel: 'Pay NOW',
            buttonLabel: 'Pay with Omise'
        });
    }

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
    }

    const omisePaymentHandler = () => {
        OmiseCard.open({
            amount: amount,
            onCreateTokenSuccess: (token) => {
                CheckOutWithCreditCard(
                    {
                        email: "test1234@hotmail.com",
                        customer_id: "user0001",
                        movie_id: movie_id,
                        token: token,
                        reserveSeat: reserveSeat,
                        price: amount
                    }
                )

            },
            onFormClosed: () => {
                console.log("closed form",)
            },
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        creditCardConfigure();
        omisePaymentHandler();
    }


    return (
        <div className="own-form">
            <Script
                url="https://cdn.omise.co/omise.js"
                onLoad={handleLoadScript}
            />
            <form>
                <div
                    id="credit-card"
                    type="button"
                    onClick={(e) => { handleClick(e) }}
                    className="p-4 text-5xl text-white"
                >
                    ชำระเงิน {totalPrice}.
                </div>
            </form>
        </div>
    )
}

export default CheckOut