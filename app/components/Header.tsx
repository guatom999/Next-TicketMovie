'use client'
import React from 'react'
import Image from 'next/image'
import { FiAlignJustify } from 'react-icons/fi'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'



type Props = {}

const Header = (props: Props) => {

  const { data: session } = useSession()
  // if (session) {
  //     return (
  //         <div>
  //             <h1> already logged in </h1>
  //             <button
  //                 className="btn btn-primary"
  //                 onClick={() => signOut}
  //             >
  //                 Sign Out
  //             </button>
  //         </div>
  //     )
  // }
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
            <h1>Logged in</h1>
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