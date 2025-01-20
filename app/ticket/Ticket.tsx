'use client'
import React, { useEffect, useState } from "react";
import { DateStringToInteger, GetNumericalDate } from "@/utils/time";

import TicketDetail from "./[ticketid]/TicketDetail";

type Props = {
    src: string;
    ticketData: any;
};

const Ticket = ({ src, ticketData }: Props) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(0)

    const toggleModalOpen = (ticket = null) => {
        setSelectedTicket(ticket);
        setOpenModal(!openModal);
    };

    useEffect(() => {
        console.log("data from string is", DateStringToInteger(ticketData[0].created_at), "date now is ============>", GetNumericalDate());
    }, [])


    return (
        <div className="relative">
            {openModal && (
                <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 backdrop-blur-sm"></div>
            )}
            <div className={`mx-auto w-3/5 my-10 ${openModal ? "blur-sm" : ""}`}>
                <div className="flex justify-center">
                    <p className="text-3xl font-bold">TICKET</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-10 mt-14 text-xl">
                    <div className={`cursor-pointer ${selectedTicketType == 0 ? "font-bold" : ""}`} onClick={() => setSelectedTicketType(0)}>
                        Upcoming
                    </div>
                    <div className={`cursor-pointer ${selectedTicketType == 1 ? "font-bold" : ""}`} onClick={() => setSelectedTicketType(1)}>
                        History
                    </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
                    {
                        selectedTicketType === 0 ?
                            (
                                ticketData.filter((ticket: any) => GetNumericalDate() < DateStringToInteger(ticket.movie_date) / 1000).map((item: any) =>
                                    <div
                                        key={item.id}
                                        className="flex items-center rounded-lg shadow-md"
                                    >
                                        <div className="flex w-96 bg-white rounded-lg shadow-lg overflow-hidden">
                                            <img
                                                src={item.movie_image}
                                                alt="Event Poster"
                                                className="w-1/3 object-cover"
                                            />
                                            <div className="flex flex-col w-2/3 p-4 relative group-hover group">
                                                <p className="text-sm text-blue-500 font-semibold">{item.movie_date}</p>

                                                <p className="text-md font-bold text-gray-800 leading-tight">
                                                    {item.movie_name}
                                                </p>

                                                <p className="text-sm text-gray-600">{item.movie_name}</p>
                                                <div className="mt-auto text-sm text-gray-800 font-semibold">
                                                    1 Ticket(s)
                                                </div>
                                                <button
                                                    onClick={() => toggleModalOpen(item)}
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                            :
                            (
                                ticketData.filter((ticket: any) => GetNumericalDate() > DateStringToInteger(ticket.movie_date) / 1000).map((item: any) =>
                                    <div
                                        key={item.id}
                                        className="flex items-center rounded-lg shadow-md"
                                    >
                                        <div className="flex w-96 bg-white rounded-lg shadow-lg overflow-hidden">
                                            <img
                                                src={item.movie_image}
                                                alt="Event Poster"
                                                className="w-1/3 object-cover"
                                            />
                                            <div className="flex flex-col w-2/3 p-4 relative group-hover group">
                                                <p className="text-sm text-blue-500 font-semibold">{item.movie_date}</p>

                                                <p className="text-md font-bold text-gray-800 leading-tight">
                                                    {item.movie_name}
                                                </p>

                                                <p className="text-sm text-gray-600">{item.movie_name}</p>
                                                <div className="mt-auto text-sm text-gray-800 font-semibold">
                                                    1 Ticket(s)
                                                </div>
                                                <button
                                                    onClick={() => toggleModalOpen(item)}
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            )

                    }
                </div>
                {/* <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
                    {ticketData.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex items-center rounded-lg shadow-md"
                        >
                            <div className="flex w-96 bg-white rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={item.movie_image}
                                    alt="Event Poster"
                                    className="w-1/3 object-cover"
                                />
                                <div className="flex flex-col w-2/3 p-4 relative group-hover group">
                                    <p className="text-sm text-blue-500 font-semibold">{item.created_at.split(":")[0]}</p>

                                    <p className="text-md font-bold text-gray-800 leading-tight">
                                        {item.movie_name}
                                    </p>

                                    <p className="text-sm text-gray-600">{item.movie_name}</p>
                                    <div className="mt-auto text-sm text-gray-800 font-semibold">
                                        1 Ticket(s)
                                    </div>
                                    <button
                                        onClick={() => toggleModalOpen(item)}
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>

            {openModal && (
                <TicketDetail
                    setOpen={toggleModalOpen}
                    isOpen={true}
                    data={selectedTicket}
                />
            )}
        </div>
    );
};

export default Ticket;
