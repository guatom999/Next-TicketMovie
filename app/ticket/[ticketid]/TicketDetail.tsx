import React from 'react'
import Image from 'next/image'

type Props = {
  data: any
}

const TicketDetail = ({ data }: Props) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg w-1/5 ">
        <div className="flex justify-center p-5">
          E-Ticket
        </div>
        <div className="flex justify-center bg-cyan-500 mx-auto w-full">
          <img
            src={`https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/2b972aa0d53a11ed911101117567899b.png?format=basic&resize=w425,h610`}
            width="200"
          />
        </div>
        <div>

        </div>
        <div className="flex justify-center p-5">
          E-Ticket
        </div>

      </div>
    </div>
  )
}

export default TicketDetail