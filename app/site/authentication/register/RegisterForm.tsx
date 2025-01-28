import React, { Dispatch, SetStateAction, useState } from 'react'
import LoadingModal from '@/app/components/LoadingModal'

type Props = {
    isLoading: boolean
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    isError: boolean
    errorMessage: string
    handleSubmit: (e: React.FormEvent) => void

}

const RegisterForm = ({ isLoading, email, username, password, setEmail, setUsername, setPassword, isError, errorMessage, handleSubmit }: Props) => {

    return (
        <div className="flex justify-center items-center">
            {/* {isLoading && (
                <LoadingModal
                    isOpen={isOpen}
                    setOpen={() => setIsOpen(!isOpen)}
                />
            ) : ( */}
            <div className="w-[250px] m-10">
                <p className="flex justify-center text-4xl">Register</p>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="w-full flex flex-col space-y-5 justify-center  my-5">
                        <input
                            value={email}
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Email"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input
                            value={username}
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Username"
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                        <input
                            value={password}
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    {isError && (
                        <div className="flex justify-center">
                            <p className="text-red-500">{errorMessage}</p>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            className="bg-gray-300 bg-opacity-90 border rounded-md p-2 my-10 text-white hover:bg-slate-600 w-full"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default RegisterForm