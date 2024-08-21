import React from 'react'

type Props = {}

const SeatDetail = (props: Props) => {
    return (
        <div className="flex justify-between mx-10 my-5">
            <div className="flex flex-row items-center">
                <button className="selected"></button>
                <p>ที่นั่งที่ถูกเลือก</p>
            </div>
            <div className="flex flex-row items-center">
                <button className="bg-[#898989] hover:cursor-pointer border-2 border-[#898989] border-opacity-90 w-6 h-6 m-1"></button>
                <p>ที่นั่งที่ถูกจองแล้ว</p>
            </div>
            <div className="flex flex-row items-center">
                <button className="select"></button>
                <p>ที่นั่งว่าง</p>
            </div>
        </div>
    )
}

export default SeatDetail