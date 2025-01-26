import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PromotionProps {

}

interface ShowderPromotion {
    id: string,
    title: string,
    date: string
    description?: string
    promotion_image: string,
    status: boolean,
}

const promotions: ShowderPromotion[] = [
    { id: '1', title: 'Promotion 1', date: "21 Jan 2024", promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20240617032015_EDE5E3D2-253A-4340-AC03-0C1A4E585112.jpg", status: true },
    { id: '2', title: 'Promotion 2', date: "21 Jan 2024", promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: false },
    { id: '3', title: 'Promotion 3', date: "21 Jan 2024", promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191225153440_B60985BA-D3CF-42BA-BFD0-95E7BD348403.jpg", status: true },
    { id: '4', title: 'Promotion 4', date: "21 Jan 2024", promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191208091408_05626AB8-CA69-4C2D-AEEA-839B9F568856.jpg", status: true },
    { id: '5', title: 'Promotion 5', date: "21 Jan 2024", promotion_image: "https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191201064405_6B2BC0C4-603D-4CA4-A6AF-125823B3766F.jpg", status: true },
]



const Promotion: React.FC<PromotionProps> = (props) => {


    return (
        <div className="my-10">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">PROMOTIONS</p>
            </div>
            <div className="flex flex-wrap justify-center">
                {promotions.filter((promotion: ShowderPromotion) => promotion.status == true).map((promotion) => (
                    <div key={promotion.id} className="m-5">
                        <Link
                            href={`promotion/detail/${promotion.id}`}
                        >
                            <Image
                                src={promotion.promotion_image}
                                width={500}
                                height={100}
                                alt={promotion.title}
                            />
                            {/* <img src={promotion.promotion_image} alt={promotion.title} className="w-80 h-80 object-cover" /> */}
                            <p className="text-xl font-medium ">{promotion.title}</p>
                            <p>{promotion.date}</p>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Promotion