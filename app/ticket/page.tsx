'use server'
import React from 'react'
import Ticket from './Ticket'
import axios from 'axios'
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { useSession } from "next-auth/react"

// type Props = {
//     src: string
// }


const page = async (
    // { src }: Props
) => {

    const session: any = await getServerSession(authOptions);

    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_INVENTORY_URL}/inventory/${session?.user.customer_id}`)

    return (
        <Ticket ticketData={data} />
    )
}

export default page