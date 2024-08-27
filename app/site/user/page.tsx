'use client'
import React from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  // session: 
}

const page = (props: Props) => {

  let router = useRouter()


  const { data: session } = useSession()

  // console.log("session", { session })

  if (!session) {
    router.replace("authentication/login")
  }

  return (
    <div className="w-1/3 mx-auto pt-6">
      <div className="flex justify-center items-center">
        <h1>PROFILE</h1>
      </div>
      <div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">EMAIL</p>
          <p className="w-1/2">{session?.user?.email}</p>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">TICKET</p>
          <Link
            // href={`../site/ticket`}
            href={`../ticket`}
            className="flex justify-center border px-5 py-1 w-1/2"
            replace>
            {/* <button className="border  px-5 py-1 w-1/2">SHOW TICKET</button> */}
            SHOW TICKET
          </Link>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">MOBILE</p>
          <div className="flex flex-row w-1/2 relative">
            <p className="">+66 89 888 8888</p>
            <button className="border-2 p-1 absolute right-0">
              CHANGE
            </button>
          </div>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">TYPE OF MEMBER</p>
          <p className="w-1/2">REGULAR</p>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">CHANGE PASSWORD</p>
          <button className="border-2 px-5 py-1 w-1/2">CHANGE PASSWORD</button>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">MY POINTS</p>
          <p className="w-1/2">0</p>
        </div>
        {/* <div className="flex flex-row">
          <div className="w-1/2">
            <p className="py-3">EMAIL</p>
            <p className="py-3">MOBILE</p>
            <p className="py-3">TYPE OF MEMBER</p>
            <p className="py-3">CHANGE PASSWORD</p>
            <p className="py-3">MY POINTS</p>
          </div>
          <div className="w-1/2">
            <p className="py-3">{session?.user?.email}</p>
            <p className="py-3">+66 89 888</p>
            <p className="py-3">REGULAR</p>
            <p className="py-3">CHANGE PASSWORD</p>
            <p className="py-3">MY POINTS</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default page