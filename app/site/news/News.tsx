import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NewsProps {

}

interface ShowderNews {
    id: string,
    title: string,
    date: string
    description?: string
    News_image: string,
    status: boolean,
}

const NewList: ShowderNews[] = [
    { id: '1', title: 'News 1', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '2', title: 'News 2', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '3', title: 'News 3', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '4', title: 'News 4', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '5', title: 'News 5', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '6', title: 'News 6', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '7', title: 'News 7', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '8', title: 'News 8', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
    { id: '9', title: 'News 9', date: "21 Jan 2024", News_image: "https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241228113334_6C68686A-3161-4619-AC18-1C5CF69A4DD5.jpg", status: true },
]



const News: React.FC<NewsProps> = (props) => {


    return (
        <div className="py-10 ">
            <div className="max-w-max mx-auto px-4">
                <h2 className="text-3xl font-bold text-center">NEWS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-x-7 gap-y-16 my-5">
                    {NewList.map((news) => (
                        <div key={news.id} className="bg-white h-full">
                            <Link
                                href={`news/detail/${news.id}`}
                            >
                                <Image
                                    src={news.News_image}
                                    alt={news.title}
                                    width={234}
                                    height={100}
                                    unoptimized={true}
                                />
                                <div className="my-2">
                                    <h3 className="text-md font-medium text-gray-800 ">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 ">{news.date}</p>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default News