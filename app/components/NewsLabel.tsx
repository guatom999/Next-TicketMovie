import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const NewsLabel = (props: Props) => {
    return (
        <div className="mx-5">
            <div className="mb-[8px]">
                <span className="text-bold text-4xl">NEWS</span>
            </div>
            <div className="flex flex-row justify-center gap-7">
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241206171752_7105AF82-97CF-498E-8FEC-633EE92FC8FD.jpg`}
                            alt=''
                            width={594}
                            height={420}
                        />
                        <div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241112153025_82C2371A-ECF9-42A4-8311-334298354011.jpg`}
                            alt=''
                            width={594}
                            height={420}
                        />
                    </Link>
                </div>
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com//assets/uploads/news/thumbnail_web_path/20241028074806_116F2CD9-C4D8-4ED5-8622-42AA4A10DEE7.png`}
                            alt=''
                            width={594}
                            height={420}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewsLabel