import React from 'react'
import TicketDetail from './TicketDetail'
import axios, { AxiosResponse } from 'axios'

type Props = {
  Id : string
}

const page = async ({ params }: { params: { ticketid: string }, props: Props }) => {

  const {data} = await axios.get(`http://localhost:8090/movie/getmovieshowtime/${params.ticketid}`)

  return (
    // <div>page</div>
    <TicketDetail data={data} />
  )
}

export default page