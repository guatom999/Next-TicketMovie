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

  const prev = () => { setCurr(() => { return curr == 0 ? slides.length - 1 : curr - 1 }) }
  const next = () => { setCurr(() => { return curr == slides.length - 1 ? 0 : curr + 1 }) }

  return (
    <div className="overflow-hidden relative mt-2">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>
      <div className="absolute inset-5 flex items-center justify-between p-4">
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
    </div>
  )
}

export default Carousel