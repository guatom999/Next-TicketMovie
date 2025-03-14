import React from 'react'
import Image from 'next/image'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="my-10">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">PROMOTIONS</p>
            </div>
            <div className="flex justify-center mt-10">
                <Image
                    src={`https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241206171752_7105AF82-97CF-498E-8FEC-633EE92FC8FD.jpg`}
                    alt={""}
                    width={730}
                    height={100}
                    unoptimized={true}
                />
            </div>

        </div>
    )
}

export default page