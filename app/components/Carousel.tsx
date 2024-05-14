'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from "react-feather"

type Props = {
  slides: string[]
}

const Carousel = ({ slides }: Props) => {

  const autoSlide = false
  const autoSlideInterval = 10

  const [curr, setCurr] = useState(0);

  const prev = () => {setCurr(() => {return curr == 0 ? slides.length - 1 : curr - 1})}
  const next = () => {setCurr(() => {return curr == slides.length - 1 ? 0 : curr + 1})}
  // useEffect(() => {
  //   if (!autoSlide) return;
  //   const slideInterval = setInterval(next, autoSlideInterval);
  //   return () => clearInterval(slideInterval);
  // }, []);

  return (
    // <div classNameName="mt-2" style={{ position: 'relative', width: '1903px', height: '416px' }}>
    //   <Image
    //     alt='Carousel'
    //     src={`https://www.housesamyan.com/assets/uploads/banner/image_web_path/20220126005322_9DDC1635-1368-4C58-A1AF-6918758ED952.jpg`}
    //     layout='fill'
    //     style={{
    //       objectFit: 'contain',
    //     }}
    //   />
    //   <Image
    //     alt='Carousel'
    //     src={`https://www.housesamyan.com/assets/uploads/banner/image_web_path/20201128151756_C63F1989-AD8D-4BE8-BE6E-D1E5117294A1.jpg`}
    //     layout='fill'
    //     style={{
    //       objectFit: 'contain',
    //     }}
    //   />
    // </div>
    <div className="overflow-hidden relative mt-2">
      <div
        className="flex transition-transform ease-out duration-1000"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img,index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div> */}
    </div>

  )
}

export default Carousel