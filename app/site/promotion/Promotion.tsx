import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PromotionProps {

}

interface ShowderPromotion {
    id: string,
    title: string,
    description: string
    promotion_image: string,
    status: boolean,
}

const promotions: ShowderPromotion[] = [
    { id: '1', title: 'Promotion 1', description: 'Description 1', promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: true },
    { id: '2', title: 'Promotion 2', description: 'Description 2', promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: false },
    { id: '3', title: 'Promotion 3', description: 'Description 3', promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: true },
    { id: '4', title: 'Promotion 4', description: 'Description 4', promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: false },
    { id: '5', title: 'Promotion 5', description: 'Description 5', promotion_image: "https://scontent.fbkk22-3.fna.fbcdn.net/v/t39.30808-6/239554652_136722238631410_580305794482617301_n.png?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZVYLsiuccq4Q7kNvgEHFbn6&_nc_oc=AdjcaZSUWVvzzc7-QsxNhZYsGvXKB5CtoSKEQ30qRzEPMLH1VEbSgHZX-T-b_upf0u9rum2PpoUvfA6fEiFO_isX&_nc_zt=23&_nc_ht=scontent.fbkk22-3.fna&_nc_gid=AUbym5VugxpwigjyYBQTICy&oh=00_AYBGKTx6X-vsceaeJHFGwKLPe4lRL-JM6wKBqc9KEx-MlQ&oe=6799C000", status: true },
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
                            <p className="text-2xl font-bold">{promotion.title}</p>
                            <p>{promotion.description}</p>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Promotion