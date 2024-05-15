'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FiAlignJustify } from 'react-icons/fi'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'



type Props = {}

const Header = (props: Props) => {
  const [expand, setExpand] = useState(false)

  const { data: session } = useSession()

  // console.log("session is", session?.user)

  return (
    <div className="shadow-md w-full flex justify-between px-5 pt-2 pb-1">
      <div className="flex">
        <Link href="/">
          <Image
            src="https://www.housesamyan.com/assets/website/img/logo.png"
            width={150}
            height={48}
            alt="Logo"
          />
        </Link>
      </div>
      {
        session ? (
          <div>
            <p>Test {session.user?.email}</p>
            {/* <Image
              src={`${session.user?.image}`}
              width={150}
              height={48}
              alt="Logo"
            /> */}
            <button
              className='text-xl'
              onClick={() => signOut()}
            >
              SignOut
            </button>
          </div>
        ) : (
          <div className="flex">
            <Link href="/authentication/login">
              <FiAlignJustify className="text-5xl text-slate-300" />
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Header