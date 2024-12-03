"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiAlignJustify } from "react-icons/fi";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import SideBar from "./SideBar";

type Props = {};

const Header = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();

  const toggleOpenSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky top-0 z-10 bg-white">
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
          <button
            onClick={() => {
              toggleOpenSideBar();
            }}
          >
            <FiAlignJustify className="text-5xl text-slate-300" />
          </button>
        </div>
        {/* <div>
          <button
            className="p-2 border border-blue-600"
            onClick={() => { toggleOpenSideBar() }}
          >
            SideBar Test
          </button>
        </div> */}

        {/* Show Session User Test */}
        {
          // session ? (
          //   <div>
          //     <p>{session.user?.email}</p>
          //     {/* <Image
          //     src={`${session.user?.image}`}
          //     width={150}
          //     height={48}
          //     alt="Logo"
          //   /> */}
          //     <button
          //       className='text-xl'
          //       onClick={() => signOut()}
          //     >
          //       SignOut
          //     </button>
          //   </div>
          // ) : (
          //   <div className="flex">
          //     <button onClick={() => {toggleOpenSideBar()}}>
          //       <FiAlignJustify className="text-5xl text-slate-300" />
          //     </button>
          //     {/* <Link href="/authentication/login" onClick={toggleOpenSideBar()}> */}
          //     {/* </Link> */}
          //   </div>
          // )
        }
      </div>
      <SideBar
        isOpen={isSidebarOpen}
        setOpen={toggleOpenSideBar}
        session={session}
      />
    </div>
  );
};

export default Header;
