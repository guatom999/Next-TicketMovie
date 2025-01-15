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

    const session: any = await getServerSession(authOptions);

    // console.log("session?.user.customer_i  is ", session?.user.customer_id)
    let { data } = await axios.get(`http://localhost:8101/inventory/${session?.user.customer_id}`)

    console.log("data is :::::::::::::::>", data)

    return (
        <Ticket src={src} ticketData={data} />
    )
}

export default page