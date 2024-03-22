import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="w-full  bg-[#272626] bg-opacity-85">
      <div className="flex flex-row container mx-96 ">
        <div className="">
          <p className="text-white">1</p>
          <p className="text-white">2</p>
        </div>
        <div className="">
          <p className="text-white">2</p>
        </div>
        <div>
          <p className="text-white">3</p>
        </div>
      </div>
    </div>
  )
}

export default Footer