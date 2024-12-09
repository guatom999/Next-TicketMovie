import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const PromotionsLabel = (props: Props) => {
    return (
        <div className="mx-5">
            <div className="mb-[8px]">
                <span className="text-bold text-4xl">PROMOTION</span>
            </div>
            <div className="flex flex-row justify-center gap-7 font-sans">
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20240617032015_EDE5E3D2-253A-4340-AC03-0C1A4E585112.jpg`}
                            alt=''
                            width={594}
                            height={420}
                        />
                        <div className="flex flex-col">
                            <div className="font-sans text-gray-800">
                                <div>สมัครสมาชิกเฮ้าส์ จ่ายทีเดียว เป็นตลอดชีพ</div>
                            </div>
                            <div className="promotion-date">
                                <div>25 Jan 2022</div>
                            </div>
                        </div>

                    </Link>
                </div>
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191225153440_B60985BA-D3CF-42BA-BFD0-95E7BD348403.jpg`}
                            alt=''
                            width={594}
                            height={420}
                        />
                        <div className="flex flex-col">
                            <div className="promotion-description">
                                <span>House Tumbler KEEP IT COOL</span>
                            </div>
                            <div className="promotion-date">
                                <span>25 Dec 2019</span>
                            </div>
                        </div>

                    </Link>
                </div>
                <div>
                    <Link
                        href="/"
                    >
                        <Image
                            src={`https://www.housesamyan.com/assets/uploads/promotion/thumbnail_web_path/20191208091408_05626AB8-CA69-4C2D-AEEA-839B9F568856.jpg`}
                            alt=''
                            width={594}
                            height={420}
                        />
                        <div className="flex flex-col">
                            <div className="promotion-description">
                                <span>กระเป๋าดินสอ LOVE OF SIAM LIMITED CHRISTMAS EDITION</span>
                            </div>
                            <div className="promotion-date">
                                <span>08 Dec 2019</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PromotionsLabel