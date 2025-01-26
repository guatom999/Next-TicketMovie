import React, { useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

type Props = {}

const page = async ({ }: Props) => {

  const { data: movie } = await axios.get(`http://localhost:8090/movie/getallmovie`)
  const { data: comingSoonMovie } = await axios.get(`http://localhost:8090/movie/comingsoonmovie`)

  return (
    <Movie
      movie={movie}
      comingSoonMovie={comingSoonMovie}
    />
  )
}

export default page