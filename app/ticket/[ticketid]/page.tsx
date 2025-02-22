import React from 'react'
import TicketDetail from './TicketDetail'
import axios, { AxiosResponse } from 'axios'

type Props = {
  Id: string
}

const page = async ({ params }: { params: { ticketid: string }, props: Props }) => {
}

export default page