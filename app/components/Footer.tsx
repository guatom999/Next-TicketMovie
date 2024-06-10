import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="w-full  bg-[#272626] bg-opacity-85">
      <div className="container px-96 py-5 text-white text-opacity-75">
        <div>
          แผนผังเว็บไซต์
        </div>
        <div className="flex justify-between text-xs my-2">
          <div className="flex flex-col">
            <p>HOME</p>
            <p>MOVIE</p>
            <p>NEWS</p>
            <p>E-MEMBERPRIVILAGE</p>
          </div>
          <div className="flex flex-col">
            <p>EVENT</p>
            <p>PROMOTION</p>
          </div>
          <div className="flex flex-col">
            <p>HOME</p>
            <p>MOVIE</p>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Footer