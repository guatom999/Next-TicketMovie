import Carousel from "./components/Carousel";
import MovieList from "./components/MovieList";
import axios from 'axios'
import { useSession } from "next-auth/react"
import Label from "./components/Label";
import NewsLabel from "./components/NewsLabel";
import PromotionsLabel from "./components/PromotionsLabel";


const RecommendedPromotions = [
  {
    name: "สมัครสมาชิกเฮ้าส์ จ่ายทีเดียว เป็นตลอดชีพ",
    date: "25 Jan 2022",
    promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20240617032015_EDE5E3D2-253A-4340-AC03-0C1A4E585112.jpg",
    description: "Promotion Description",
    link: "site/promotion/detail/1",
    status: true
  },
  {
    name: "House Tumbler KEEP IT COOL",
    date: "25 Dec 2019",
    promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191225153440_B60985BA-D3CF-42BA-BFD0-95E7BD348403.jpg",
    description: "Promotion Description",
    link: "site/promotion/detail/2",
    status: true
  },
  {
    name: "กระเป๋าดินสอ LOVE OF SIAM LIMITED CHRISTMAS EDITION",
    date: "08 Dec 2019",
    promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191208091408_05626AB8-CA69-4C2D-AEEA-839B9F568856.jpg",
    description: "Promotion Description",
    link: "site/promotion/detail/3",
    status: true
  },
]

const RecommendedNews = [
  {
    name: "โปรแกรมฉายเดือนมกราคม 2568 ที่โรงภาพยนตร์ House สามย่าน",
    date: "28 Dec 2024",
    promotion_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg",
    description: "Promotion Description",
    link: "site/news/detail/1",
    status: true
  },
  {
    name: "โปรแกรมฉายเดือนธันวาคม 2567 ที่โรงภาพยนตร์ House สามย่าน",
    date: "06 Dec 2024",
    promotion_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241206171752_7105AF82-97CF-498E-8FEC-633EE92FC8FD.jpg",
    description: "Promotion Description",
    link: "site/news/detail/2",
    status: true
  },
  {
    name: "โปรแกรมฉายเดือนพฤศจิกายน 2567 ที่โรงภาพยนตร์ House สามย่าน",
    date: "12 Nov 2024",
    promotion_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241112153025_82C2371A-ECF9-42A4-8311-334298354011.jpg",
    description: "Promotion Description",
    link: "site/news/detail/3",
    status: true
  },
]

export default async function Home() {

  const slides = [
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20220126005322_9DDC1635-1368-4C58-A1AF-6918758ED952.jpg",
    "https://www.housesamyan.com/assets/uploads/banner/image_web_path/20201128151756_C63F1989-AD8D-4BE8-BE6E-D1E5117294A1.jpg"
  ]


  const { data: movie } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/getallmovie`)
  const { data: comingsoonMovie } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_MOVIE_URL}/movie/comingsoonmovie`)

  return (
    <div className="space-y-5 mb-20">
      <Carousel slides={slides} />
      <MovieList movie={movie} comingsoonMovie={comingsoonMovie} />
      <Label data={RecommendedPromotions} width={594} height={420} labelName="PROMOTION" />
      <Label data={RecommendedNews} width={594} height={420} labelName="NEWS" />
      {/* <PromotionsLabel />
      <NewsLabel /> */}
    </div>
  );
}
