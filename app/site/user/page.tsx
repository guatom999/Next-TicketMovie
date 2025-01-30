"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  // session:
};

const page = (props: Props) => {
  let router = useRouter();

  const { data: session } = useSession();

  // console.log("session", { session })


  if (!session) {
    router.replace("/site/authentication/login");
  }

  return (
    <div className="lg:w-1/3 md:w-2/4 mx-auto my-10">
      <div className="flex justify-center items-center">
        <p className="text-3xl font-bold">PROFILE</p>
      </div>
      <div className="">
        {/* <div className="flex justify-center items-center">
          <Image
            className="mx-1 cursor-pointer"
            src={session?.user?.image ?? ""}
            alt="Movie Image"
            width={200}
            height={463}
          />
        </div> */}
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
            replace
          >
            {/* <button className="border  px-5 py-1 w-1/2">SHOW TICKET</button> */}
            SHOW TICKET
          </Link>
        </div>
        <div className="flex flex-row py-3">
          <p className="w-1/2">MOBILE</p>
          <div className="flex flex-row w-1/2 relative">
            <p className="">+66 89 888 8888</p>
            <button className="border-2 p-1 absolute right-0 lg:px-5 md:px">CHANGE</button>
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
      </div>
    </div >
  );
};

export default page;
