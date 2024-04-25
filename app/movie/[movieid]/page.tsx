'use client'

import axios, { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Movieshowdate from './Movieshowdate'
import { useQuery } from 'react-query';


interface Props {
  image_url: string,
}

interface MovieData {
  title: string,
  price: number,
  image_url: string,
  valiable: number,
}

interface MovieDetails {
  title: string,
  show_time: string,
  seat_available: [],
}

const page = async ({ params }: { params: { movieid: string }, props: Props }) => {
  const [isClick, setIsClick] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  // const [movieDetail, setMovieDetail] = useState<AxiosResponse<any, any> | undefined>()
  // const [movieList, setMovieList] = useState<AxiosResponse<any, any> | undefined>()

  // const { isLoading , error ,data} = useQuery<any>('')

  // const fetchMovieDetail = async () => {
  //   const res = await axios.get(`http://localhost:8090/movie/getmovieshowtime/${params.movieid}`)
  //   return res.data.json()
  // }

  // const fetchMovieList = async () => {
  //   const res = await axios.get(`http://localhost:8090/movie/getmovie/${params.movieid}`)
  //   return res.data.json()
  // }

  // const { isLoading , error , data} = useQuery<any>('', fetchMovieDetail, {
  //   onSuccess: () => 

    
  // })


  // const [movieDetail , movieList] = await Promise.all([fetchMovieDetail,fetchMovieList])

  const movieDetail = await axios.get(`http://localhost:8090/movie/getmovieshowtime/${params.movieid}`)
  const movieList = await axios.get(`http://localhost:8090/movie/getmovie/${params.movieid}`)

  // useEffect(() => {
  //   axios.get(`http://localhost:8090/movie/getmovieshowtime/${params.movieid}`).then((data) => {
  //     setMovieDetail(data)
  //   }).catch((err) => {
  //     console.log("err" , err)
  //   })
  //   axios.get(`http://localhost:8090/movie/getmovie/${params.movieid}`).then((data) => {
  //     setMovieList(data)
  //   }).catch((err) => {
  //     console.log("err" , err)
  //   })
  // })




  let movieDetailShowCase: string[][] = []
  let movieDetailIndex: number[][] = []
  let movieDetailIndexKeep: number[] = []
  let key: number[] = []
  let movieDate: string[] = []
  let movieTime: string[] = []
  let breakpoint = /:(.*)/s
  let movie_length = movieDetail?.data.length

  movieDetail?.data.forEach((movieDetail: MovieDetails, i: number) => {

    key.push(i)

    let splitTime = movieDetail.show_time.split(breakpoint)

    if (i == 0) {
      movieDate.push(splitTime[0])
    }
    else if (splitTime[0] != movieDate[movieDate.length - 1]) {
      movieDetailShowCase.push(movieTime)
      movieDetailIndex.push(movieDetailIndexKeep)
      movieDate.push(splitTime[0])
      movieTime = []
      movieDetailIndexKeep = []
    }

    movieTime.push(splitTime[1])
    movieDetailIndexKeep.push(i)

    if (i + 1 == movie_length) {
      movieDetailShowCase.push(movieTime)
      movieDetailIndex.push(movieDetailIndexKeep)
      movieTime = []
    }

  })

  return (
    // <>
    //   {
    //     isLoading ? (
    //       <p>Loading...</p>
    //     ) : (
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
    //     )
    //   }
    // </>
  )
}

export default page