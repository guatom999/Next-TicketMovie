'use client'
import React, { useState } from 'react'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'


interface MovieData {
  movie_id: string,
  title: string,
  price: number,
  image_url: string,
  avaliable: number
}

interface Props {
  movie: any,
  comingsoonMovie: any
}

const MovieList = ({ movie, comingsoonMovie }: Props) => {

  const [optionsSelect, setOptionsSelect] = useState(0)

  return (
    <>
      <div className="flex flex-row my-5">
        <button className={`mt-7 mx-5 ${optionsSelect == 0 ? "font-bold underline decoration-4 underline-offset-8" : ""}`} onClick={() => { setOptionsSelect(0) }}>NOW SHOWING</button>
        <button className={`mt-7 mx-5 ${optionsSelect == 1 ? "font-bold underline decoration-4 underline-offset-8" : ""}`} onClick={() => { setOptionsSelect(1) }}>COMING SOON</button>
      </div>
      {
        optionsSelect == 0 ? (
          <div className="flex flex-row">
            {
              movie?.map((result: MovieData,index: number) => (
                <div className="p-1" key={index}>
                  {/* <Link href={`/movie/${result.movie_id}`}> */}
                  <Link href={`/movie/${result.movie_id}`}>
                    <Image
                      key={result.movie_id}
                      src={result.image_url}
                      alt='Movie Image'
                      width={309}
                      height={463}
                    />
                  </Link>

                </div>
              ))
            }
          </div>
        ) : (
          <div className="flex flex-row">
            {
              comingsoonMovie?.map((result: MovieData,index:number) => (
                <div className="p-1" key={index}>
                  {/* <Link href={`/movie/${result.movie_id}`}> */}
                  <Link href={`/movie/${result.movie_id}`}>
                    <Image
                      key={result.movie_id}
                      src={result.image_url}
                      alt='Movie Image'
                      width={309}
                      height={463}
                    />
                  </Link>

                </div>
              ))
            }
          </div>
        )
      }
    </>

  )
}

export default MovieList