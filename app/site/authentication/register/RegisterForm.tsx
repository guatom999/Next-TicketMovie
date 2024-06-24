import React, { Dispatch, SetStateAction } from 'react'
import Modal from "../../../components/Modal"

type Props = {
    isLoading: boolean
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>

    handleSubmit: (e: React.FormEvent) => void

}

const RegisterForm = ({ isLoading, email, username, password, setEmail, setUsername, setPassword, handleSubmit }: Props) => {


    return (
        <div className="flex justify-center items-center">
            {isLoading ? (
                <Modal />
            ) : (
                <div className="w-[400px] m-10">
                    <p className="flex justify-center">Register</p>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-center">
                            <input
                                value={email}
                                className=" border-b-4 p-2"
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <input
                                value={username}
                                className=" border-b-4 p-2"
                                placeholder="Username"
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <input
                                value={password}
                                className="border-b-4 p-2"
                                placeholder="Password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mt-12 bg-gray-300 border rounded-md p-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>

                    </form>

                </div>
            )
            }

        </div>
    )
}

export default RegisterForm