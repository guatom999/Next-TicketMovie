'use client'
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  data: any;
  isOpen: boolean;
  setOpen: () => void;
};

// const TicketDetail = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
const TicketDetail = ({ data, setOpen, isOpen }: Props) => {
  const [openModal, setOpenModal] = useState(true);

  console.log("data on TikcetDeatail is :::::::::::::::::::::::::::::::::::::::>", data)

  const handleClickOutside = (event: any) => {
    if (isOpen && !event.target.closest(".ticket-card") && !event.target.closest(".sidebarbutton")) {
      setOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!openModal) return null;

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="ticket-card flex flex-col justify-center items-center bg-white bg-opacity-90 rounded-lg shadow-lg w-1/5">
          <div className="flex justify-center p-5">E-Ticket</div>
          <div className="w-full mb-5">
            <p className="flex justify-center items-center font-sans text-2xl">
              {data.movie_name}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center bg-cyan-500 mx-auto w-full py-5">
            {/* <img
              src={`${data.ticket_image}`}
              width="200"
            /> */}
            <Image
              src={data.ticket_image}
              width={300}
              height={100}
              alt=''
              unoptimized={true}
            />
          </div>
          <div></div>
          <div className="flex justify-between  w-full px-10 py-3">
            <div>
              Event Time<br />
              {data.movie_date}
            </div>
            <div>
              Order No.<br />
              {data.order_number}
            </div>
          </div>
          <div className="flex justify-between  w-full px-10 py-3">
            <div>
              Show time<br />
              {data.movie_show_time}
            </div>
            <div>
              Seat.<br />
              {data.seat.map((seat: string, index: number) => (<>{index === 0 ? seat : "," + seat}</>))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default TicketDetail;