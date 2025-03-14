"use server";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Movieshowdate from "./Movieshowdate";
import { getServerSession } from "next-auth/next";

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

const Page = async ({ params, }: { params: { movieid: string } }) => {

  const movieDetailRes = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovieshowtime/${params.movieid}`,
    {
      headers: {
        // 'Authorization':`bearer ${session?.}`
      },
    },
  );

  const movieListRes = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovie/${params.movieid}`,
  );

  const movieDetail: any = movieDetailRes.json()
  const movieList: any = movieListRes.json()


  // const { data: movieDetail } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovieshowtime/${params.movieid}`,
  //   {
  //     headers: {
  //       // 'Authorization':`bearer ${session?.}`
  //     },
  //   },
  // );



  // const { data: movieList } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getmovie/${params.movieid}`,
  // );

  let movieDetailShowCase: string[][] = [];
  let movieDetailIndex: number[][] = [];
  let movieDetailIndexKeep: number[] = [];
  let key: number[] = [];
  let movieDate: string[] = [];
  let movieTime: string[] = [];
  let breakpoint = /:(.*)/s;
  let movie_length = movieDetail?.length;

  movieDetail?.forEach((movieDetail: MovieDetails, i: number) => {
    key.push(i);

    let splitTime = movieDetail.show_time.split(breakpoint);


    if (i == 0) {
      movieDate.push(splitTime[0]);
    } else if (splitTime[0] != movieDate[movieDate.length - 1]) {
      movieDetailShowCase.push(movieTime);
      movieDetailIndex.push(movieDetailIndexKeep);
      movieDate.push(splitTime[0]);
      movieTime = [];
      movieDetailIndexKeep = [];
    }

    movieTime.push(splitTime[1]);
    movieDetailIndexKeep.push(i);

    if (i + 1 == movie_length) {
      movieDetailShowCase.push(movieTime);
      movieDetailIndex.push(movieDetailIndexKeep);
      movieTime = [];
    }
  });

  return (
    <>
      <Movieshowdate
        movid_id={params.movieid}
        movieDetailIndex={movieDetailIndex}
        movieList={movieList}
        movieDetail={movieDetail}
        movieDetailShowCase={movieDetailShowCase}
        movieDate={movieDate}
        movieTime={movieTime}
        movie_length={movie_length}
      />
    </>
  );
};

export default Page;
