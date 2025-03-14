import React from 'react'
import Image from 'next/image'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="my-10">
            <div className="flex justify-center">
                <p className="text-3xl font-bold">PROMOTIONS</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-10 w-2/5 mx-auto space-y-10">
                <Image
                    src={`https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241206171752_7105AF82-97CF-498E-8FEC-633EE92FC8FD.jpg`}
                    alt={""}
                    width={730}
                    height={100}
                    unoptimized={true}
                />
                <div className="font-thin text-lg">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default page