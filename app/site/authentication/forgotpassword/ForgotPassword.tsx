'use client'
import React from 'react'

interface ForgotPassword {

}

const ForgotPassword: React.FC<ForgotPassword> = ({ }) => {

    const handlerForgotPassword = () => {
    }

    return (
        <div className="my-10 max-w-[475px] mx-auto">
            <div className="flex justify-center items-center">
                <p className="text-3xl font-bold">Forgot Password</p>
            </div>
            <div className="flex justify-center items-center my-16">
                <p className="font-extralight text-gray-500 text-opacity-80">Enter Your Email</p>
            </div>
            <div className="flex justify-center items-center ">
                <label className="w-full border-b-2 ">
                    <p className="font-light text-gray-500 ">E-mail</p>
                </label>
            </div>
            <div className="w-full">
                <button
                    className="bg-gray-300 bg-opacity-90 border rounded-md p-2  text-white hover:bg-slate-600 w-full mt-10"
                    onClick={() => { handlerForgotPassword() }}
                >
                    <p className="text-gray-700 text-opacity-50 hover:text-white hover:bg">Send E-mail</p>
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword