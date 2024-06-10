'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    data: any
}

const Movie = ({ data }: Props) => {

    const [optionsSelect, setOptionsSelect] = useState(0)

    console.log("data is", data)

    return (
        <div className="my-10 ">
            <div className="flex justify-center">
                <p className="text-3xl">MOVIES</p>
            </div>
            <div className="flex flex-row justify-center mb-5">
                <button className={`mt-7 mx-5 ${optionsSelect == 0 ? "font-bold underline decoration-4 underline-offset-8" : ""}`} onClick={() => { setOptionsSelect(0) }}>NOW SHOWING</button>
                <button className={`mt-7 mx-5 ${optionsSelect == 1 ? "font-bold underline decoration-4 underline-offset-8" : ""}`} onClick={() => { setOptionsSelect(1) }}>COMING SOON</button>
            </div>
            {
                optionsSelect == 0 ? (
                    <div className="w-11/12 mx-auto">
                        <div className="flex flex-wrap justify-center">
                            {data.map((value: any, index: number) => (
                                <Link href={`/movie/${value.movie_id}`}>
                                    <div className="content-center px-4">
                                        <Image
                                            key={index}
                                            src={value.image_url}
                                            alt='test'
                                            width={234}
                                            height={100}
                                        />
                                        <div className='flex flex-col items-center my-2 gap-1'>
                                            <p className="font-bold">{value.title}</p>
                                            <p className="">Date</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <h1>COMING SOON</h1>
                    </>
                )
            }

        </div>
    )
}

export default Movie