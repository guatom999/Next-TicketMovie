import React, { useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

type Props = {}

const page = async ({}: Props) => {

  const { data } = await axios.get(`http://localhost:8090/movie/getallmovie`)

  return (
    <Movie data={data}/>
  )
}

export default page