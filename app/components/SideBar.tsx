import React, { useState } from 'react'
import Link from 'next/link'

type EmptyProps = {

}

type Props = {
  isOpen: boolean;
  setOpen: () => void;
}

const SideBar = ({ isOpen, setOpen }: Props) => {
  const menuList = ["HOME", "MOVIE", "NEWS", "EVENT", "E-MEMBER PRIVILAGE", "PROMOTION", "FAQ", "ABOUT US", "CONTACT US", "CINEMA LOCATION", "LOGIN", "LOGOUT"]
  const linkList = ["home", "movie", "news", "event", "e-member", "promotion", "faq", "aboutus", "contactus", "cinemalocation", "login", ""]
  const [menuIndex, setMenuIndex] = useState(0)
  return (
    <>

      {isOpen ? (
        <div className="fixed flex justify-end  bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full">
          <div
            className="text-xl w-1/3 h-screen bg-slate-200 z-20 "
          >
            {menuList.map((v, index) => (
              <Link href={`../site/${linkList[index]}`} replace>
                <button
                  className={`flex justify-start w-full  pb-2 pt-4 px-16  ${menuIndex == index ? "bg-black text-white" : "hover:bg-white"}`}
                  onClick={() => {
                    setMenuIndex(index)
                    setOpen()
                  }}
                >
                  {v}
                </button>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
        </>
      )}
    </>

    // <div
    //   className={`fixed top-0 left-0 h-full w-64 overflow-y-auto bg-gray-800 text-white p-4 transition duration-300 ease-in-out ${
    //     isOpen ? 'z-50' : '-z-10'
    //   }`}
    // >
    //   {/* Sidebar content */}
    //   <button 
    //   // onClick={setOpen} 
    //   className="absolute top-4 right-4">
    //     <svg
    //       className="h-6 w-6 text-white"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    //     </svg>
    //   </button>
    //   {/* ... */}
    // </div>
  )
}

export default SideBar