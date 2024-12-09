import Carousel from "./components/Carousel";
import MovieList from "./components/MovieList";
import axios from 'axios'
import { useSession } from "next-auth/react"
import Label from "./components/Label";
import NewsLabel from "./components/NewsLabel";
import PromotionsLabel from "./components/PromotionsLabel";


export default async function Home() {

  const slides = [
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20220126005322_9DDC1635-1368-4C58-A1AF-6918758ED952.jpg",
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20201128151756_C63F1989-AD8D-4BE8-BE6E-D1E5117294A1.jpg"
  ]


  const { data: movie } = await axios.get(`http://localhost:8090/movie/getallmovie`)
  const { data: comingsoonMovie } = await axios.get(`http://localhost:8090/movie/comingsoonmovie`)

  return (
    <div>
      <Carousel slides={slides} />
      <MovieList movie={movie} comingsoonMovie={comingsoonMovie} />
      <PromotionsLabel />
      <NewsLabel />
    </div>
  );
}
