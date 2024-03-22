import axios from 'axios'
import React from 'react'
import Image from 'next/image'

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

  const movieList = await axios.get(`http://localhost:8090/movie/getmovie/${params.movieid}`)
  const movieDetail = await axios.get(`http://localhost:8090/movie/getmovieshowtime/${params.movieid}`)

  let movieDetailShowCase: string[][] = []
  let movieDate:string[] = []
  let movieTime:string[] = []
  let breakpoint = /:(.*)/s
  let movie_length = movieDetail.data.length

  movieDetail.data.forEach((movieDetail:MovieDetails, i:number) => {
    // let currentDate = ""    
    let splitTime = movieDetail.show_time.split(breakpoint)

   
    if (i == 0) {
      movieDate.push(splitTime[0])
    }else if(splitTime[0]  != movieDate[i-1]){
      movieDetailShowCase.push(movieTime)
      movieDate.push(splitTime[0])
      movieTime = []
    }
    else if(i == movie_length) {
      movieDetailShowCase.push(movieTime)
    }
      movieTime.push(splitTime[1])
  
  })



  return (
    <div className="flex flex-row justify-content-between w-full">
      <div className="w-full p-4" >
        <div className="font-serif font-semibold text-2xl">MOVIE INFORMATION</div>
        <div className="flex justify-center p-10">
          <Image
            src={movieList.data.image_url}
            alt='movie image'
            width={350}
            height={100}
          />
        </div>
      </div>
      <div className="w-full p-4">
        <div className="font-serif font-semibold text-2xl">SHOWTIMES</div>
        <div>
          {movieDetail.data.map((item:MovieDetails) => (
            <div className="">
              {item.show_time}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-orange-500">

      </div>
    </div>
  )
}

export default page