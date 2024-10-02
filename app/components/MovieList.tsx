"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "react-feather";

interface MovieData {
  movie_id: string;
  title: string;
  price: number;
  image_url: string;
  avaliable: number;
}

interface Props {
  movie: any;
  autoSlide: boolean;
  comingsoonMovie: any;
}

const MovieList = ({ movie,  comingsoonMovie }: Props) => {
  const [optionsSelect, setOptionsSelect] = useState(0);

  const [curr, setCurr] = useState(0);
  const autoSlide = true
  const autoSlideInterval = 1000

  const changeSlide = (newIndex:any) => {
    setCurr((prevState) => {
      const nextIndex = newIndex % movie.length; 
      if(prevState == movie.length - 6 ) return 0
      return nextIndex <= 0 ? movie.length - 6 : nextIndex;
    });
  };

  const prev = () => changeSlide(curr - 1);
  const next = () => changeSlide(curr + 1);

  useEffect(() => {
    if (autoSlide) {
      const intervalId = setInterval(() => {
        changeSlide(curr + 1);
      }, autoSlideInterval);

      return () => clearInterval(intervalId);
    }
  }, [autoSlide, curr, autoSlideInterval]);

  // const [curr, setCurr] = useState(0);

  // const changeSlide = (newIndex: any) => {
  //   setCurr((prevState) => {
  //     console.log("prevState ======?" , prevState)
  //     // const nextIndex = newIndex % movie.length; // Handle looping
  //     // return 
  //     return prevState + 1
  //   });
  // };

  // useEffect(() => {
  //   if (autoSlide) {
  //     const intervalId = setInterval(() => {
  //       changeSlide
  //     }, 1000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [curr]);

  // const prev = () => {
  //   setCurr(() => {
  //     return curr == 0 ? movie.length - 6 : curr - 1;
  //   });
  // };
  // const next = () => {
  //   setCurr(() => {
  //     return curr == movie.length - 6 ? 0 : curr + 1;
  //   });
  // };

  return (
    <>
      <div className="my-5">
        <button
          className={`mt-7 mx-5 ${
            optionsSelect == 0
              ? "font-bold underline decoration-4 underline-offset-8"
              : ""
          }`}
          onClick={() => {
            setOptionsSelect(0);
          }}
        >
          NOW SHOWING
        </button>
        <button
          className={`mt-7 mx-5 ${
            optionsSelect == 1
              ? "font-bold underline decoration-4 underline-offset-8"
              : ""
          }`}
          onClick={() => {
            setOptionsSelect(1);
          }}
        >
          COMING SOON
        </button>
      </div>
      <div className="overflow-hidden">
        {optionsSelect == 0 ? (
          <>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              // style={{ transform: `translateX(-${curr * 100}%)` }}
              style={{ transform: `translateX(-${curr * 317}px)` }}
            >
              {movie?.map((result: MovieData, index: number) => (
                <Link
                  key={result.movie_id}
                  className="hover:cursor-pointer"
                  href={`/movie/${result.movie_id}`}
                  passHref
                  legacyBehavior
                >
                  <Image
                    className="mx-1 cursor-pointer" // Add cursor-pointer here
                    src={result.image_url}
                    alt="Movie Image"
                    width={309}
                    height={463}
                  />
                </Link>
              ))}
            </div>
            <div className="absolute inset-x-5 bottom-20 flex items-center justify-between p-4">
              <button onClick={prev}>
                <ChevronLeft size={40} />
              </button>
              <button onClick={next}>
                <ChevronRight size={40} />
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default MovieList;
