import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[400px] m-10">
                <p className="flex justify-center">Login</p>
                <form>
                    <div className="flex justify-center">
                        <input className=" border-b-4 p-2" placeholder="Email"></input>
                    </div>
                    <div className="flex justify-center">
                        <input className="border-b-4 p-2" placeholder="Password"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page