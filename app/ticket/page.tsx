import React from 'react'
import Ticket from './Ticket'
import axios from 'axios'

type Props = {
    src: string
}

const page = ({ src }: Props) => {

    const customerid = "user0002"

    const data = axios.get(`http://localhost:8101/inventory/${customerid}`).then(() => {}).catch((error) => {
        console.log('error is', error)
    })


    return (
        <Ticket src={src} ticketData={data} />
    )
}

export default page