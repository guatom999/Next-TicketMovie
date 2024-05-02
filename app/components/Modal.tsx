import React from 'react'

type Props = {}

const Modal = (props: Props) => {
  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center"
    >
        <div 
            className="w-[600px]"
        >
            <div className="bg-white p-2">  
                Modal Test....
            </div>
        </div>
    </div>
  )
}

export default Modal