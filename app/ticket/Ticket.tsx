'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link";
import TicketDetail from './[ticketid]/TicketDetail';


type Props = {
    src: string
    ticketData: any
}

const Ticket = ({ src, ticketData }: Props) => {

    const [openModal, setOpenModal] = useState(false)

    console.log("ticketData is ------------------>", ticketData)
    return (
        // <div className="my-10 mx-auto w-2/4 ">
        //     <div className="flex justify-center">
        //         <p className="text-3xl font-bold">TICKET</p>
        //     </div>
        //     <div className="grid grid-cols-4 py-10">
        //         {
        //             ticketData.map((value: any, index: number) => (
        //                 <div
        //                     key={index}
        //                     className="flex flex-row"
        //                 >
        //                     <div>
        //                         <Image src={value.movie_image} width={309} height={463} alt="qr image" />
        //                     </div>
        //                     <div>
        //                         <p className="font-mono font-semibold text-base py-5">{value.movie_name}</p>
        //                         <button onClick={() => { setOpenModal(!openModal); }}>
        //                             <p>{value.created_at.split(':')[0]}</p>
        //                         </button>
        //                         <p>{value.price}</p>
        //                     </div>
        //                     {/* </Link> */}
        //                     {openModal && (
        //                         <TicketDetail
        //                             data={ticketData.ticket_image}
        //                         />
        //                     )}

        //                 </div>
        //             ))
        //         }
        //     </div>
        // </div>
        <div className="mx-auto w-2/4">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">TICKET</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {ticketData.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center p-4 rounded-lg shadow-md"
                    >
                        <div className="flex justify-center w-1/2">
                            <Image
                                src={item.movie_image}
                                alt={`Image for ${item.movie_image}`}
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex items-start w-1/2 pl-4">
                            <p>{item.movie_name}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Ticket