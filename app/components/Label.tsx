import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

interface LabelProps {
    data: any[];
    labelName?: string;
    link?: string
    width?: number;
    height?: number;
}

const Label: React.FC<LabelProps> = ({ data, labelName, width, height }) => {
    return (
        <div className="mx-5">
            <div className="mb-[8px] flex justify-between items-center">
                <span className="text-bold text-4xl">{labelName}</span>
                <Link
                    href={`/site/${labelName?.toLocaleLowerCase()}`}
                >
                    <span className="text-bold text-">VIEW ALL</span>
                </Link>
            </div>
            <div className="flex flex-row justify-center gap-7 font-sans">
                {data.filter((value: any) => value.status === true).map((value: any, index: number) => (
                    <div key={index}>
                        <Link href={`${value.link}`}>
                            <Image src={value.promotion_image} alt="promotion" width={width} height={height} unoptimized={true} />
                            <div className="flex flex-col mt-5">
                                <div className="font-sans text-gray-800">
                                    {value.name}
                                </div>
                                <div className="promotion-date">
                                    {value.date}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Label;