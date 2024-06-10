'use client'

import React, { useState } from 'react'
import Script from "react-load-script";
import CheckOutWithCreditCard from "./CheckOutWithCreditCard"
import Modal from "./Modal"
import { useRouter } from 'next/navigation'


let OmiseCard

const CheckOut = ({ totalPrice, session, movie_id, reserveSeat , date }) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

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
                setIsLoading(true),
                    CheckOutWithCreditCard(
                        {
                            email: "test1234@hotmail.com",
                            customer_id: "user0001",
                            movie_id: movie_id,
                            token: token,
                            reserveSeat: reserveSeat,
                            price: amount,
                            date: date
                        }
                    ).then((result) => {
                        // console.log("result is" ,result)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 5000)
                    })

            },
            onFormClosed: () => {
                console.log("closed form",)
            },
        },
        )
    }

    const handleClick = (e) => {
        // setIsLoading(true) 

        e.preventDefault();
        if (!session) {
            router.push("/authentication/login")
        } else {
            creditCardConfigure();
            omisePaymentHandler();
        }

    }

    if (isLoading) {
        return (
            // <div className="flex items-center min-h-screen justify-center">
            //     <p className="animate-bounce">Loading...</p>
            // </div>
            <Modal />
        )
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
                    onClick={(e) => {
                        handleClick(e)
                    }}
                    className="p-4 text-5xl text-white"
                >
                    ชำระเงิน {totalPrice}.
                </div>
            </form>
        </div>
    )
}

export default CheckOut