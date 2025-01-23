'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';

type Props = {
    iconType?: string | null
    isOpen: boolean;
    setOpen: () => void;
    label?: string | null;
}

const Modal = ({ iconType, label, isOpen, setOpen }: Props) => {

    const handleClickOutside = (event: any) => {
        if (isOpen && !event.target.closest(".modal-card")) {
            setOpen();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    if (!isOpen) return null;


    return (
        isOpen && (
            <div className="modal-card fixed inset-0 flex items-center justify-center z-50 ">
                <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg w-1/4 h-1/4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-32 h-32 text-green-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div>
                        <h2 className="mt-4 text-lg font-bold text-gray-800">{label}</h2>
                    </div>
                    <div className="w-4/5 rounded-lg bg-green-500 text-white text-center my-4">
                        <button className="w-full py-2 px-4 rounded-lg bg-green-500 text-white text-center"
                            onClick={() => setOpen()}
                        >
                            Close
                        </button>

                    </div>
                </div>
            </div>
        )

    )
}

export default Modal