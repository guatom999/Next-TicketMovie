import React from 'react'
import Image from 'next/image'

type Props = {
    src: string
    ticketData: any
}

const Ticket = ({ src, ticketData }: Props) => {

    return (
        <div className="my-10 mx-auto w-2/4">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">TICKET</p>
            </div>
            <div className="flex flex-col items-center py-10">
                {
                    ticketData.map((value: any, index: number) => (
                        <div className="flex flex-row border rounded-md w-full ">
                            {/* {value.movie_id} */}
                            <div>
                                <Image src={value.ticket_image} width={230} height={100} alt="qr image" />
                            </div>
                            <div>
                                <p className="font-mono font-semibold text-2xl py-5">{value.movie_name}</p>
                                <p>{value.created_at}</p>
                                <p>{value.price}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Ticket