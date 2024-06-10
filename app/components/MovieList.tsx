import React from 'react'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'


interface MovieData {
  movie_id: string,
  title: string,
  price: number,
  image_url: string,
  avaliable: number
}

const MovieList = async () => {

  const { data } = await axios.get(`http://localhost:8090/movie/getallmovie`)

  return (
    <>
      <div className="flex flex-row">
        <p className="p-3 m-3">ON GOING</p>
        <p className="p-3 m-3">COMING SOON</p>
      </div>
      <div className="flex flex-row">
        {
          data?.map((result: MovieData) => (
            <div className="p-1">
              {/* <Link href={`/movie/${result.movie_id}`}> */}
              <Link href={`/movie/${result.movie_id}`}>
                <Image
                  key={result.movie_id}
                  src={result.image_url}
                  alt='Movie Image'
                  width={309}
                  height={463}
                />
              </Link>

            </div>
          ))
        }

      </div>
    </>

  )
}

export default MovieList