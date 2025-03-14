import React, { useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

type Props = {}

interface MovieDetail { }

const page = async ({ }: Props) => {

  // const { data: movie } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getallmovie`)
  const movieRes: Response = await fetch(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getallmovie`)
  const comingsoonMovieRes: Response = await fetch(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/comingsoonmovie`)

  const movie: any = await movieRes.json()
  const comingSoonMovie: any = await comingsoonMovieRes.json()
  // const { data: comingSoonMovie } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/comingsoonmovie`)

  return (
    <Movie
      movie={movie}
      comingSoonMovie={comingSoonMovie}
    />
  )
}

export default page