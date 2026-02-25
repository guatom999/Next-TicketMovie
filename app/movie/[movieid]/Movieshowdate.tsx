"use client";

import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CheckOut from "@/app/components/CheckOut";
import { useSession } from "next-auth/react";
import { DateStringToInteger, FormatTime, GetNumericalDate, ConvertBangkokTime, GetBangkokHour, IsTimeHourGreater, IsRoundPassed } from "@/utils/time";
import RoundDetail from "@/app/type/MovieAvailable";
import SeatDetail from "@/app/components/SeatDetail";

type Props = {
  movie_id: string;
  movieList: AxiosResponse<any, any> | any | undefined;
  // movieDetail: AxiosResponse<any, any> | undefined;
  movieDetail: any,
  movieDetailIndex: number[][];
  movieDetailShowCase: any;
  movieDate: any;
  movieTime: any;
  movie_length: any;
  separateDateAndTime: Record<string, RoundDetail[]>;
  // isComingsoon: boolean;
};

// interface Props {

// }


const Movieshowdate = ({
  movie_id,
  movieDetailIndex,
  movieList,
  movieDetail,
  movieDetailShowCase,
  movieDate,
  movieTime,
  movie_length,
  separateDateAndTime,
}: Props) => {
  const defaultValidDates = Object.entries(separateDateAndTime).filter((data: any) => DateStringToInteger(data[0]) >= GetNumericalDate(false));
  const defaultFirstRound = (() => {
    for (const [, rounds] of defaultValidDates) {
      const upcoming = (rounds as RoundDetail[]).find((round) => !IsRoundPassed(round.fullDateTime));
      if (upcoming) return upcoming;
    }
    return undefined;
  })();

  const [movieIndex, setMovieIndex] = useState(0);
  const [showTime, setShowTime] = useState(defaultFirstRound ? "0" + defaultFirstRound.timeString : "00");
  const [showDate, setShowDate] = useState(defaultFirstRound ? defaultFirstRound.timeString : "");
  const [reserveSeat, setReserveSeat] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<Boolean[]>(
    Array(48).fill(false),
  );
  const [selectedRound, setSelectedRound] = useState<RoundDetail | null>(defaultFirstRound || null);
  const [checkDate, setCheckDate] = useState(movieDate[0]);

  const { data: session } = useSession();
  const bangkokHour = GetBangkokHour();

  const seat = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12",
    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12",
    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12",
  ];

  useEffect(() => {
    setReserveSeat([]);
  }, [movieIndex, showTime],);


  const isNotComingSoon = () => {
    if (
      DateStringToInteger(movieDate[0]) > GetNumericalDate(false)
    ) {
      return false;
    }
    movieDate = movieDate.filter(
      (showDate: string) => {
        return DateStringToInteger(showDate) >= GetNumericalDate(false)
      }
    );

    return true;
  };


  // const movieDetailSeparate = Object.entries(separateDateAndTime).filter((data: any, i: number) => {
  //   return DateStringToInteger(data[0]) >= GetNumericalDate(false)
  // })



  // const isThatButton = (data: string) => {
  //   if (data == showTime) {
  //     return "bg-slate-500 text-white";
  //   }
  //   return "bg-white";
  // };

  const isThatButton = (data: boolean) => {
    // if (data == showTime) {
    return data ? "bg-slate-500 text-white hover:bg-slate-500 duration-100 hover:text-white hover:cursor-pointer" : "text-gray-300 hover:bg-slate-500 duration-100 hover:text-white hover:cursor-pointer";
    //   return "bg-slate-500 text-white";
    // }
    // return "bg-white";
  };

  // const compareShowTime = (day: string, hours: number): boolean => {
  const compareShowTime = (data: any): boolean => {

    const timeNow = new Date()
    const bkkTimeNow = timeNow.toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    });
    const bangkokTime = new Date(bkkTimeNow);


    // if (hours > bangkokTime.getHours()) return true

    return false
  }

  const handleSelectSeat = (data: string, index: number) => {
    let selectedSeat = isSelected.map((c, i) => {
      if (i === index) {
        return !c;
      } else {
        return c;
      }
    });

    if (!reserveSeat.includes(data)) {
      setReserveSeat([...reserveSeat, data]);
    } else {
      reserveSeat.splice(reserveSeat.indexOf(data), 1);
      setReserveSeat(reserveSeat);
    }
    setIsSelected(selectedSeat);
  };

  return (
    <div className="flex flex-row justify-content-between w-full">
      <div className="w-full p-4">
        <div className="font-serif font-semibold text-2xl">
          MOVIE INFORMATION
        </div>
        <div className="flex justify-center p-10">
          <Image
            src={movieList?.image_url}
            alt="movie image"
            width={350}
            height={100}
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col items-center p-5 gap-4">
          <p className="text-bold font-sans text-2xl">{movieList?.title}</p>
          <p>{movieList?.running_time} </p>
          <p className="text-center ">{movieList?.description}</p>
        </div>
      </div>

      <>
        {isNotComingSoon() ? (
          <>
            <div className="w-full max-h-screen p-4 overflow-y-scroll">
              <div className="font-serif font-semibold text-2xl">SHOWTIMES</div>
              <div className="py-10 ">
                {
                  Object.entries(separateDateAndTime).filter((data: any, i: number) => {
                    return DateStringToInteger(data[0]) >= GetNumericalDate(false)
                  }).map((data: any, i: number) => (
                    <div key={i}>
                      <p>{FormatTime(data[0])}</p>
                      <div className="flex flex-wrap gap-2 my-3">
                        {separateDateAndTime[data[0]].map((round: RoundDetail, j: number) => (
                          <React.Fragment key={j}>
                            {
                              !IsRoundPassed(round.fullDateTime) ? (
                                <>
                                  <button
                                    className={`flex justify-center items-center border rounded-md 
                                                w-[120px] h-[36px] duration-100 hover:cursor-pointer
                                                ${selectedRound?.timeString === round.timeString && selectedRound?.movie_date === round.movie_date
                                        ? "bg-slate-500 text-white hover:bg-slate-500"
                                        : "bg-white hover:bg-slate-200 text-gray-400"
                                      }
                                              `}
                                    onClick={() => {
                                      setShowTime(i.toString() + round.timeString);
                                      setSelectedRound(round);
                                      setShowDate(round.timeString);
                                    }}
                                  >
                                    <p>{round.timeString}</p>
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    disabled
                                    className={`flex justify-center items-center border rounded-md 
                                                w-[120px] h-[36px] 
                                                text-gray-300 bg-gray-100 cursor-not-allowed
                                              `}
                                  >
                                    <p>{round.timeString}</p>
                                  </button>
                                </>
                              )
                            }
                          </React.Fragment>

                        ))}
                      </div>
                    </div>
                  ))
                }
                {/* {movieDate.map((date: any, i: number) => (
                  <div key={i} className="my-5">
                    <p className=''>{FormatTime(date)}</p>
                    <div className=" flex flex-wrap gap-2 my-3 ">
                      {movieDetailShowCase[i].filter((showtime: any) => {
                        return ConvertBangkokTime(date, showtime) >= GetNumericalDate(true)
                      }).map(
                        (data: any, index: number) => (
                          <div
                            key={movieDetailIndex[i][index]}
                          >
                            <button
                              className={`
                                          flex justify-center 
                                          items-center border rounded-md w-[120px] h-[36px]
                                           hover:bg-slate-500 duration-100 hover:text-white hover:cursor-pointer 
                                           ${isThatButton(
                                i.toString() + index.toString()
                              )}
                                                        `}
                              onClick={() => {
                                setShowTime(i.toString() + index.toString()),
                                  setMovieIndex(movieDetailIndex[i][index]),
                                  setShowDate(date);
                              }}
                            >
                              <p className="">{data}</p>
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))} */}
              </div>
            </div>

            <div className="w-full p-4 mr-5">
              <div className="font-serif font-semibold text-2xl">SEATING</div>
              <div className="py-10">
                <p className="font-semibold text-2xl">
                  {/* {movieDetailSeparate?.[movieIndex]?.title ?? ""} */}
                  TestNaja
                </p>
                <SeatDetail />
                <p className="flex justify-center font-semibold text-3xl">
                  SCREEN
                </p>
                <div className="relative mt-3 mb-20">
                  <div className="absolute bottom-0 left-0 right-0 border-b-2 border-slate-700"></div>
                </div>
                <div className="grid grid-cols-12  w-3/5 mx-auto">
                  {seat.map((data: string, index: number) => (
                    <div key={index}>
                      {selectedRound?.seat_available?.[index]?.[data] ? (

                        <button
                          className={`${isSelected[index] ? "selected" : "select"
                            }`}
                          onClick={() => {
                            handleSelectSeat(data, index);
                          }}
                        >
                        </button>
                      ) : (
                        <p className="bg-[#898989] border-2 border-[#898989] border-opacity-90 w-6 h-6 m-1"></p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-2xl font-bold">ที่นั่ง</div>
                <div className=" w-full bg-red h-[40px]">
                  <div className="flex flex-row w-full">
                    {reserveSeat.sort((a: any, b: any) => a.localeCompare(b, undefined, { numeric: true })).map((v: any, index: number) => (
                      <div key={index} className="mx-1">
                        {index == reserveSeat.length - 1 ? (
                          <div>
                            <p className="">{v}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="">{v},</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-slate-600 flex justify-center items-center">
                  <button>
                    {reserveSeat.length === 0 ? (
                      <p className="p-4 text-5xl text-white">ชำระเงิน</p>
                    ) : (
                      <CheckOut
                        totalPrice={reserveSeat.length * 150}
                        session={session}
                        movie_name={movieList?.title}
                        movie_date={selectedRound?.movie_date}
                        // movie_date={movieDate[showTime.split("")[0]]}
                        // movie_showtime={movieDetailShowCase[showTime.split("")[0]][showTime.split("")[1]]}
                        movie_showtime={selectedRound?.timeString}
                        movie_id={selectedRound?.movie_id}
                        movie_image={movieList?.image_url}
                        reserveSeat={reserveSeat}
                        date={selectedRound?.movie_date}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full p-4">
              <div className="font-serif font-semibold text-2xl">SHOWTIMES</div>
            </div>

            <div className="w-full p-4 mr-5">
              <div className="font-serif font-semibold text-2xl">SEATING</div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Movieshowdate;
