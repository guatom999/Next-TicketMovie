import React from 'react'
import Ticket from './Ticket'
import axios from 'axios'
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { useSession } from "next-auth/react"

type Props = {
    src: string
}


const page = async ({ src }: Props) => {

    const session:any = await getServerSession(authOptions);

    let { data } = await axios.get(`http://localhost:8101/inventory/${session?.user._id}`)

    return (
        <Ticket src={src} ticketData={data} />
    )
}

export default page