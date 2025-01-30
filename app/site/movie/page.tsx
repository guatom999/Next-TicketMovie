import React, { useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

type Props = {}

const page = async ({ }: Props) => {

  const { data: movie } = await axios.get(`${process.env.NEXT_DEV_MOVIE_URL}/getallmovie`)
  const { data: comingSoonMovie } = await axios.get(`${process.env.NEXT_DEV_MOVIE_URL}/movie/comingsoonmovie`)

  return (
    <Movie
      movie={movie}
      comingSoonMovie={comingSoonMovie}
    />
  )
}

export default page