'use client'

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
    if (isOpen && !event.target.closest(".sidebar") && !event.target.closest(".sidebarbutton")) {
      setOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div
          // className={`fixed flex justify-end bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full  ${isOpen ? "transition-transform duration-300 translate-x-0" : "transition-transform duration-300 translate-y-12"
          //   } `}
          className={`fixed left-0 flex justify-end bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-96"} 
            } `}
        >
          <div className="text-xl w-1/3 h-screen bg-slate-200 z-20 sidebar">
            {menuList.map((v, index) => (
              <>
                <div
                  key={index}
                >
                  {index == 10 && session ? (
                    <Link
                      href={"../site/user"}
                      replace
                    >
                      <button
                        className={`flex justify-start w-full pb-2 pt-4 px-16 ${menuIndex == index
                          ? "bg-black text-white"
                          : "hover:bg-white"
                          }`}
                        onClick={() => {
                          setOpen();
                          setMenuIndex(index);
                        }}
                      >
                        <p style={{ textTransform: "uppercase" }}>
                          {session.user?.email}
                        </p>
                      </button>
                    </Link>
                  ) : (
                    <Link
                      href={`${index == 11 ? "../../" : `/site/${linkList[index]}`
                        }`}
                      replace
                    >
                      <button
                        className={`flex justify-start w-full pb-2 pt-4 px-16 ${menuIndex == index
                          ? "bg-black text-white"
                          : "hover:bg-white"
                          }`}
                        onClick={() => {
                          if (index == 11) {
                            signOut();
                          }
                          setOpen();
                          setMenuIndex(index);
                        }}
                      >
                        <p>{v}</p>
                      </button>
                    </Link>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`fixed flex justify-end bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        ></div>
      )}

    </>
  );
};

export default SideBar;
