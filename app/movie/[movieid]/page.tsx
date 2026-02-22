import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Movieshowdate from "./Movieshowdate";
import { getServerSession } from "next-auth/next";
import { RoundDetail } from "@/app/type/MovieAvailable";

export const dynamic = 'force-dynamic';

interface MovieData {
  title: string;
  price: number;
  image_url: string;
  valiable: number;
}

interface MovieDetails {
  title: string;
  show_time: string;
  seat_available: [];
}

// interface RoundDetail {
//   timeString: string,
//   seat_available: Record<string, boolean>[];
// }

const Page = async ({ params, }: { params: { movieid: string } }) => {

  const movieDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovieshowtime/${params.movieid}`,
    { cache: 'no-store' },
  );



  const movieListRes = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovie/${params.movieid}`,
    { cache: 'no-store' },
  );



  const movieDetail: any = await movieDetailRes.json()
  const movieList: any = await movieListRes.json()

  let movieDetailShowCase: string[][] = [];
  let movieDetailIndex: number[][] = [];
  let movieDetailIndexKeep: number[] = [];
  let movieDate: string[] = [];
  let movieTime: string[] = [];
  let breakpoint = /:(.*)/s;
  let movie_length = movieDetail?.length;

  let separateDateAndTime: Record<string, RoundDetail[]> = {};
  // let seperateSeatByTIme: Record<string, SeatDetail[]> = {};

  movieDetail?.forEach((detail: MovieDetails, i: number) => {
    let splitTime = detail.show_time.split(breakpoint);
    const date = splitTime[0];
    const time = splitTime[1];
    if (!separateDateAndTime[date]) {
      separateDateAndTime[date] = [];
    }
    separateDateAndTime[date].push({
      timeString: time,
      seat_available: detail.seat_available,  // เก็บ array ของ seat ทั้งหมด
    });
  });

  // let separateSeatByTime: Record<string, boolean[]> = {};

  // movieDetail?.forEach((movieDetail: MovieDetails, i: number) => {

  //   let splitTime = movieDetail.show_time.split(breakpoint);

  //   if (i == 0) {
  //     movieDate.push(splitTime[0]);
  //   } else if (splitTime[0] != movieDate[movieDate.length - 1]) {
  //     movieDetailShowCase.push(movieTime);
  //     movieDetailIndex.push(movieDetailIndexKeep);
  //     movieDate.push(splitTime[0]);
  //     movieTime = [];
  //     movieDetailIndexKeep = [];
  //   }

  //   movieTime.push(splitTime[1]);
  //   movieDetailIndexKeep.push(i);

  //   if (i + 1 == movie_length) {
  //     movieDetailShowCase.push(movieTime);
  //     movieDetailIndex.push(movieDetailIndexKeep);
  //     movieTime = [];
  //   }
  // });

  return (
    <>
      <Movieshowdate
        movie_id={params.movieid}
        movieDetailIndex={movieDetailIndex}
        movieList={movieList}
        movieDetail={movieDetail}
        movieDetailShowCase={movieDetailShowCase}
        movieDate={movieDate}
        movieTime={movieTime}
        movie_length={movie_length}
        separateDateAndTime={separateDateAndTime}
      />
    </>
  );
};

export default Page;
