import React, { useRef, useEffect, useState, forwardRef } from 'react';
import Image from 'next/image';

type Props = {
  data: any;
  isOpen: boolean;
  setOpen: () => void;
};

// const TicketDetail = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
const TicketDetail = ({ data, setOpen, isOpen }: Props) => {
  const [openModal, setOpenModal] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

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
      <div className=" fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        <div className="ticket-card flex flex-col justify-center items-center bg-white rounded-lg shadow-lg w-1/5">
          <div className="flex justify-center p-5">E-Ticket</div>
          <div className="flex justify-center bg-cyan-500 mx-auto w-full">
            <img
              src={`https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/2b972aa0d53a11ed911101117567899b.png?format=basic&resize=w425,h610`}
              width="200"
            />
          </div>
          <div></div>
          <div className="flex justify-center p-5">E-Ticket</div>
        </div>
      </div>
    )
  );
};
export default TicketDetail;