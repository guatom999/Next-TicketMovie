import Carousel from "./components/Carousel";
import MovieList from "./components/MovieList";
import { useSession } from "next-auth/react"


export default function Home() {

  const slides = [
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20220126005322_9DDC1635-1368-4C58-A1AF-6918758ED952.jpg",
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20201128151756_C63F1989-AD8D-4BE8-BE6E-D1E5117294A1.jpg"
  ]



  return (
    <div>
      <Carousel slides={slides}/>
      <MovieList/>
    </div>
  );
}
