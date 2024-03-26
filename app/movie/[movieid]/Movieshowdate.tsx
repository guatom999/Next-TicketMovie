'use client'

import { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

type Props = {
    movieList: AxiosResponse
    movieDetail: AxiosResponse
    movieDetailIndex: number[][]
    movieDetailShowCase: any
    movieDate: any
    movieTime: any
    movie_length: any
}

const Movieshowdate = ({ movieDetailIndex, movieList, movieDetail, movieDetailShowCase, movieDate, movieTime, movie_length }: Props) => {

    const [movieIndex, setMovieIndex] = useState(0)
    const [showTime, setShowTime] = useState("00")
    const [showDate, setShowDate] = useState("")

    const boss = ["A1"]

    const [boolTest , SetBoolTest] = useState(false)
    const movieDetailSeparate = movieDetail.data

    console.log("movieDetail", movieDetailSeparate)

    const isThatButton = (data: string) => {
        if (data == showTime) {
            return "bg-slate-500 text-white"
        }
        return "bg-white"
    }

    // console.log("movieDetailIndex" , movieDetailIndex)

    movieDetailSeparate[movieIndex].seat_available.map((data:boolean, index:number) => {

g
    })

                        {/* {movieDetailSeparate[movieIndex].seat_available[0].map((data:boolean, index:number) => (
                                                
                        <div className={`
                        ${data ? "bg-red-500" : "text-green-500"}
                        w-6 h-6 m-2  
                        `}
                        >
                            {data ? (<p>true</p>) : (<p>false</p>)}
                        </div>
                    ))} */}

    return (
        <div className="flex flex-row justify-content-between w-full">
            <div className="w-full p-4" >
                <div className="font-serif font-semibold text-2xl">MOVIE INFORMATION</div>
                <div className="flex justify-center p-10">
                    <Image
                        src={movieList.data.image_url}
                        alt='movie image'
                        width={350}
                        height={100}
                    />
                </div>
            </div>
            <div className="w-full p-4">
                <div className="font-serif font-semibold text-2xl">SHOWTIMES</div>
                <div className="py-10">
                    {movieDate.map((data: any, i: number) => (
                        <div
                            key={i}
                            className="">
                            <p>{data}</p>
                            <div className=" flex flex-row gap-2">
                                {movieDetailShowCase[i].map((data: any, index: number) => (
                                    <div
                                        // key={movieDetailIndex[i][index]}
                                        key={movieDetailIndex[i][index]}
                                    >
                                        <button
                                            className={`
                                            flex justify-center 
                                            items-center border rounded-md w-[120px] h-[36px]
                                             hover:bg-slate-500 hover:text-white hover:cursor-pointer 
                                             ${isThatButton(index.toString() + i.toString())}
                                            `}
                                            onClick={() => { setShowTime(index.toString() + i.toString()), setMovieIndex(movieDetailIndex[i][index]) }}
                                        >
                                            <p className="">{data}</p>
                                        </button>
                                    </div>

                                ))}
                            </div>
                            {/* {item.show_time} */}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full p-4 ">
                <div className="font-serif font-semibold text-2xl">SEATING</div>
                <div className="py-10">
                    <p>{movieDetailSeparate[movieIndex].title}</p>
                    <div className="flex flex-row">
                    {/* {movieDetailSeparate[movieIndex].seat_available[0].map((data:boolean, index:number) => (
                                                
                        <div className={`
                        ${data ? "bg-red-500" : "text-green-500"}
                        w-6 h-6 m-2  
                        `}
                        >
                            {data ? (<p>true</p>) : (<p>false</p>)}
                        </div>
                    ))} */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Movieshowdate