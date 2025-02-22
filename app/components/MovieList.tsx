"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "react-feather";
import { FormatTime } from "@/utils/time";

interface MovieData {
  movie_id: string;
  title: string;
  price: number;
  release_at: string;
  image_url: string;
  avaliable: number;
}

interface Props {
  movie: any;
  autoSlide?: boolean;
  comingsoonMovie: any;
}

const MovieList = ({ movie, comingsoonMovie }: Props) => {
  const [optionsSelect, setOptionsSelect] = useState(0);

  const [curr, setCurr] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const autoSlide = true;
  const autoSlideInterval = 2000;
  const optionSelectLength =
    optionsSelect === 0 ? movie.length : comingsoonMovie.length;

  const changeSlide = (newIndex: any) => {
    setCurr((prevState) => {
      const nextIndex = newIndex % optionSelectLength;
      if (optionsSelect == 0) {
        if (prevState == optionSelectLength - 6) return 0;
      } else {
        if (prevState == optionSelectLength - 6) return 0;
      }
      return nextIndex <= 0 ? optionSelectLength - 6 : nextIndex;
    });
  };

  const prev = () => changeSlide(curr - 1);
  const next = () => changeSlide(curr + 1);

  useEffect(() => {
    if (autoSlide && optionSelectLength > 6) {
      const intervalId = setInterval(() => {
        if (!isHover) {
          changeSlide(curr + 1);
        }
      }, autoSlideInterval);

      return () => clearInterval(intervalId);
    }
  }, [autoSlide, curr, autoSlideInterval, isHover]);

  return (
    <>
      <div className="my-5">
        <button
          className={`mt-7 mx-5 ${optionsSelect == 0
            ? "font-bold underline decoration-4 underline-offset-8"
            : ""
            }`}
          onClick={() => {
            setOptionsSelect(0);
            setCurr(0);
          }}
        >
          NOW SHOWING
        </button>
        <button
          className={`mt-7 mx-5 ${optionsSelect == 1
            ? "font-bold underline decoration-4 underline-offset-8"
            : ""
            }`}
          onClick={() => {
            setOptionsSelect(1);
            setCurr(0);
          }}
        >
          COMING SOON
        </button>
      </div>
      <div className="overflow-hidden">
        {optionsSelect == 0 ? (
          <div className="w-full h-auto">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              onMouseOver={() => setIsHover(!isHover)}
              onMouseOut={() => setIsHover(!isHover)}
              style={{ transform: `translateX(-${curr * 317}px)` }}
            >
              {movie?.map((result: MovieData, index: number) => (
                <Link
                  key={result.movie_id}
                  className="hover:cursor-pointer flex-shrink-0 justify-center items-center "
                  href={`/movie/${result.movie_id}`}
                >
                  <Image
                    className="mx-1 cursor-pointer"
                    src={result.image_url}
                    alt="Movie Image"
                    width={309}
                    height={463}
                    style={{ height: '463px' }}
                  />
                  <div className="flex flex-col justify-between m-2 font-sans w-[310px]">
                    <p className="font-semibold font-serif word-wrap">{result.title}</p>
                    <div className="text-sm">{FormatTime(result?.release_at)}</div>
                  </div>
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
          </div>
        ) : (
          <div className="w-full h-auto">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              onMouseOver={() => setIsHover(!isHover)}
              onMouseOut={() => setIsHover(!isHover)}
              style={{ transform: `translateX(-${curr * 317}px)` }}
            >
              {comingsoonMovie?.map((result: MovieData, index: number) => (
                <Link
                  key={result.movie_id}
                  className="hover:cursor-pointer flex-shrink-0"
                  href={`/movie/${result.movie_id}`}
                >
                  <Image
                    className="mx-1 cursor-pointer"
                    src={result.image_url}
                    alt="Movie Image"
                    width={309}
                    height={463}
                    style={{ height: '463px' }}
                  />
                  <div className="flex flex-col justify-between m-2 font-sans ">
                    <div className="font-semibold break-words">{result.title}</div>
                    <div>{FormatTime(result?.release_at)}</div>
                  </div>
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
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;