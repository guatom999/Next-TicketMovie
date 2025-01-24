// components/LoadingModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "./Modal"
import { Dialog } from "@headlessui/react";

interface LoadingModalProps {
    isOpen: boolean;
    setOpen: () => void;
    loadingMessage?: string;
    successMessage?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, setOpen, loadingMessage, successMessage }) => {
    const timeLoading = 3000
    const [isLoading, setIsLoading] = useState(true)
    const [isClose, setIsClose] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, timeLoading)
    }, [isLoading])



    return (

        <div className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
            {
                isLoading ? (

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
                            <div className="flex flex-col items-center">
                                <svg
                                    className="animate-spin w-12 h-12  text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"

                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                <p className="mt-4 text-gray-700 text-center">{loadingMessage}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Modal
                        isOpen={isOpen}
                        setOpen={setOpen}
                        label={successMessage}
                    />
                )
            }
        </div>
    );
};

export default LoadingModal;
