import React from 'react'
import Image from 'next/image'

type Props = {
    src: string
    ticketData: any
}

const Ticket = ({ src, ticketData }: Props) => {

    return (
        <div className="my-10">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">TICKET</p>
                {
                    ticketData.map((value: any, index: number) => {
                        console.log("vaule is", value)
                    })
                }
            </div>
        </div>
    )
}

export default Ticket