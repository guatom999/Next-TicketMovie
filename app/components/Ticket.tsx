import React from 'react'
import Image from 'next/image'

type Props = {
    src: string
}

const Ticket = ({src}: Props) => {

    console.log("get src is" , src)

    return (
        <div className="flex justify-center my-10 ">
            <div className="w-1/5 ">
                <div className="border bg-cyan-300 rounded-t-lg flex justify-center">
                    E-Ticket
                </div>
                <div className="p-5">
                    <div className="flex justify-center">
                        Phum Viphurit Presents The Greng Jai Gala Live In Bangkok<br />
                        KBank Siam Pic-Ganesha Theater <br />• No Age Restriction
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src={`${src}`}
                            alt='qr code'
                            width={300}
                            height={463}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket