import React from 'react'
import Image from 'next/image'
import { FiAlignJustify } from 'react-icons/fi'
import Link from 'next/link'


type Props = {}

const Header = (props: Props) => {
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
      <div className="flex">
        <FiAlignJustify className="text-5xl text-slate-300" />
      </div>
    </div>
  )
}

export default Header