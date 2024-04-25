'use client'

import { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import CheckOut from '@/app/components/CheckOut'


type Props = {
    movid_id: string,
    movieList: AxiosResponse<any, any> | undefined
    movieDetail: AxiosResponse<any, any> | undefined
    movieDetailIndex: number[][]
    movieDetailShowCase: any
    movieDate: any
    movieTime: any
    movie_length: any
}

const Movieshowdate = ({ movid_id, movieDetailIndex, movieList, movieDetail, movieDetailShowCase, movieDate, movieTime, movie_length }: Props) => {

    const [movieIndex, setMovieIndex] = useState(0)
    const [showTime, setShowTime] = useState("00")
    const [showDate, setShowDate] = useState("")
    const [reserveSeat, setReserveSeat] = useState<string[]>([])
    const [isSelected, setIsSelected] = useState<Boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false])

    const seat = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3",]

    const movieDetailSeparate = movieDetail?.data

    useEffect(() => {
        setIsSelected([false, false, false, false, false, false, false, false, false, false, false, false])
        setReserveSeat([])
    }, [movieIndex])

    const isThatButton = (data: string) => {
        if (data == showTime) {
            return "bg-slate-500 text-white"
        }
        return "bg-white"
    }

    const handleSelectSeat = (data: string, index: number) => {
        let selectedSeat = isSelected.map((c, i) => {
            if (i === index) {
                return !c
            } else {
                return c
            }
        })

        if (!reserveSeat.includes(data)) {
            setReserveSeat([...reserveSeat, data])
        }
        else {
            reserveSeat.splice(reserveSeat.indexOf(data), 1)
            setReserveSeat(reserveSeat)
        }
        setIsSelected(selectedSeat)
    }

    return (
        <div className="flex flex-row justify-content-between w-full">
            <div className="w-full p-4" >
                <div className="font-serif font-semibold text-2xl">MOVIE INFORMATION</div>
                <div className="flex justify-center p-10">
                    <Image
                        src={movieList?.data.image_url}
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
                        </div>
                    ))}
                </div>
            </div>


            <div className="w-full p-4 mr-5 ">
                <div className="font-serif font-semibold text-2xl">SEATING</div>
                <div className="py-10">
                    <p>{movieDetailSeparate[movieIndex].title}</p>
                    <div className="flex flex-row">
                        {seat.map((data: string, index: number) => (
                            <div key={index}>
                                {movieDetailSeparate[movieIndex].seat_available[index][`${data.toString()}`] ? (
                                    <button
                                        className={`${isSelected[index] ? "selected" : "select"}`}
                                        onClick={() => { handleSelectSeat(data, index) }}
                                    >
                                    </button>
                                ) : (
                                    <button className="bg-[#898989] hover:cursor-pointer border-2 border-[#898989] border-opacity-90 w-6 h-6 m-1"></button>
                                )}
                            </div>

                        ))
                        }
                    </div>
                    <div className="container">ที่นั่ง</div>
                    <div className="flex flex-row items-center w-full  h-[40px]">
                        {reserveSeat.map((v, i) => (
                            <div
                                key={i}
                                className=""
                            >
                                <p className="px-1">{v}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-slate-600 flex justify-center items-center">
                        <button onClick={() => {
                            // console.log("movid_id is" ,movieDetailSeparate[movieIndex].movie_id ) 
                        }}>
                            {reserveSeat.length === 0 ?
                                (
                                    <p className="p-4 text-5xl text-white">ชำระเงิน </p>
                                ) : (
                                    <CheckOut totalPrice={reserveSeat.length * 150} movie_id={movieDetailSeparate[movieIndex].movie_id} reserveSeat={reserveSeat} />
                                    // <p className="p-4 text-5xl text-white">ชำระเงิน {reserveSeat.length * 150}.</p>
                                )}
                        </button>
                    </div>
                </div>
            </div >
        </div >




    )
}

export default Movieshowdate