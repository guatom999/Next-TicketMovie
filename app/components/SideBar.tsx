import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

type EmptyProps = {};

type Props = {
  isOpen: boolean;
  setOpen: () => void;
  session: any;
};

const SideBar = ({ isOpen, setOpen, session }: Props) => {
  const menuList = [
    "HOME",
    "MOVIE",
    "NEWS",
    "EVENT",
    "E-MEMBER PRIVILAGE",
    "PROMOTION",
    "FAQ",
    "ABOUT US",
    "CONTACT US",
    "CINEMA LOCATION",
    "LOGIN",
    "LOGOUT",
  ];
  const linkList = [
    "../",
    "movie",
    "news",
    "event",
    "e_member",
    "promotion",
    "faq",
    "aboutus",
    "contactus",
    "cinemalocation",
    "authentication/login",
    "",
  ];
  const [menuIndex, setMenuIndex] = useState(0);

  const handleClickOutside = (event: any) => {
    if (isOpen && !event.target.closest(".sidebar")) {
      setOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Re-attach listener only when isOpen changes

  return (
    <>
      {isOpen ? (
        <div className="fixed flex justify-end  bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full">
          <div className="text-xl w-1/3 h-screen bg-slate-200 z-20 sidebar">
            {menuList.map((v, index) => (
              <>
                {index == 10 && session ? (
                  <Link href={`../site/user`} replace>
                    <button
                      className={`flex justify-start w-full  pb-2 pt-4 px-16  ${
                        menuIndex == index
                          ? "bg-black text-white"
                          : "hover:bg-white"
                      }`}
                      onClick={() => {
                        setMenuIndex(index);
                        setOpen();
                      }}
                    >
                      <p style={{ textTransform: "uppercase" }}>
                        {session.user?.email}
                      </p>
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={`${
                      index == 11 ? `../../` : `/site/${linkList[index]}`
                    }`}
                    replace
                  >
                    <button
                      className={`flex justify-start w-full  pb-2 pt-4 px-16  ${
                        menuIndex == index
                          ? "bg-black text-white"
                          : "hover:bg-white"
                      }`}
                      onClick={() => {
                        if (index == 11) {
                          signOut();
                        }
                        setMenuIndex(index);
                        setOpen();
                      }}
                    >
                      <p>{v}</p>
                    </button>
                  </Link>
                )}
                {/* {
                  index == 11 ? (
                    <>
                      <Link href={`../`} replace>
                        <button
                          className={`flex justify-start w-full  pb-2 pt-4 px-16  ${menuIndex == index ? "bg-black text-white" : "hover:bg-white"}`}
                          onClick={() => {
                            signOut()
                            setMenuIndex(index)
                            setOpen()
                          }}
                        >
                          <p style={{ textTransform: 'uppercase' }}>{session.user?.email}</p>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                    </>
                  )
                } */}
              </>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SideBar;
