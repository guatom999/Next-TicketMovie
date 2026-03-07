'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import axios from "axios";

type MenuItemType = "normal" | "login" | "logout";

type MenuItem = {
  label: string;
  href: string;
  type: MenuItemType;
};

type Props = {
  isOpen: boolean;
  setOpen: () => void;
  session: any;
};

const menuItems: MenuItem[] = [
  { label: "HOME", href: "/site/../", type: "normal" },
  { label: "MOVIE", href: "/site/movie", type: "normal" },
  { label: "NEWS", href: "/site/news", type: "normal" },
  { label: "EVENT", href: "/site/event", type: "normal" },
  // { label: "E-MEMBER PRIVILAGE", href: "/site/e_member", type: "normal" },
  // { label: "PROMOTION", href: "/site/promotion", type: "normal" },
  // { label: "FAQ", href: "/site/faq", type: "normal" },
  // { label: "ABOUT US", href: "/site/aboutus", type: "normal" },
  // { label: "CONTACT US", href: "/site/contactus", type: "normal" },
  // { label: "CINEMA LOCATION", href: "/site/cinemalocation", type: "normal" },
  { label: "LOGIN", href: "/site/authentication/login", type: "login" },
  { label: "LOGOUT", href: "../../", type: "logout" },
];

const SideBar = ({ isOpen, setOpen, session }: Props) => {
  const [menuIndex, setMenuIndex] = useState(0);

  const handleClickOutside = (event: any) => {
    if (
      isOpen &&
      !event.target.closest(".sidebar") &&
      !event.target.closest(".sidebarbutton")
    ) {
      setOpen();
    }
  };

  const handleSignOut = () => {
    axios.post(`${process.env.NEXT_PUBLIC_DEV_CUSTOMER_URL}/user/logout`);
    signOut();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const btnClass = (index: number) =>
    `flex justify-start w-full pb-2 pt-4 px-16 ${menuIndex === index ? "bg-black text-white" : "hover:bg-white"
    }`;

  const renderItem = (item: MenuItem, index: number) => {
    const handleClick = () => {
      if (item.type === "logout") handleSignOut();
      setOpen();
      setMenuIndex(index);
    };

    // When logged in, swap the LOGIN entry for a profile link
    if (item.type === "login" && session) {
      return (
        <Link href="/site/user" replace>
          <button className={btnClass(index)} onClick={handleClick}>
            <p style={{ textTransform: "uppercase" }}>{session.user?.email}</p>
          </button>
        </Link>
      );
    }

    return (
      <Link href={item.href} replace>
        <button className={btnClass(index)} onClick={handleClick}>
          <p>{item.label}</p>
        </button>
      </Link>
    );
  };

  return (
    <>
      {isOpen ? (
        <div
          className={`fixed left-0 flex justify-end bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full
            transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-96"
            }`}
        >
          <div className="text-xl w-1/3 h-screen bg-slate-200 z-20 sidebar">
            {menuItems.map((item, index) => (
              <div key={index}>{renderItem(item, index)}</div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`fixed flex justify-end bg-black bg-opacity-20 backdrop-blur-sm z-10 w-full
            transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        />
      )}
    </>
  );
};

export default SideBar;
