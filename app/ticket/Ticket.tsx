'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'
import Link from "next/link";
import TicketDetail from './[ticketid]/TicketDetail';


type Props = {
    src: string
    ticketData: any
}

const Ticket = ({ src, ticketData }: Props) => {

    const [openModal, setOpenModal] = useState(false)
    const modalRef = useRef(null)

    const toggleModalOpen = () => {
        setOpenModal(!openModal);
    }

    return (
        <div className="mx-auto w-3/5 my-10">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">TICKET</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                {ticketData.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center  rounded-lg shadow-md"
                    >
                        <div className="flex w-96 bg-white rounded-lg shadow-lg overflow-hidden ">
                            <img
                                src={item.movie_image}
                                alt="Event Poster"
                                className="w-1/3 object-cover"
                            />
                            <div className="flex flex-col w-2/3 p-4 relative group-hover group">
                                <p className="text-sm text-blue-500 font-semibold">10 JUN</p>

                                <p className="text-md font-bold text-gray-800 leading-tight">
                                    Phum Viphurit Presents The Greng Jai Gala Live In Bangkok
                                </p>

                                <p className="text-sm text-gray-600">
                                    KBank Siam Pic-Ganesha Theatre
                                </p>


                                <div className="mt-auto text-sm text-gray-800 font-semibold">
                                    1 Ticket(s)
                                </div>
                                <button
                                    onClick={() => { setOpenModal(true) }}
                                    className="
                                    p-2
                                    absolute 
                                    bottom-0 
                                    left-0 
                                    w-full 
                                    bg-blue-500 
                                    text-white 
                                    text-center 
                                    opacity-0 
                                    group-hover:opacity-100 
                                    transition 
                                    duration-500
                                    "
                                >
                                    View Ticket
                                </button>
                                {openModal && (
                                    <TicketDetail
                                        // ref={modalRef}
                                        setOpen={toggleModalOpen}
                                        isOpen={true}
                                        data={ticketData.ticket_image}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Ticket