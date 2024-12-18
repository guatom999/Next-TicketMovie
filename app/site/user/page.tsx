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
  const [option, setOption] = useState(0)

  // console.log("session", { session })

  console.log("session is", session)

  if (!session) {
    router.replace("authentication/login");
  }

  return (
    <div className="w-1/3 mx-auto pt-6">
      <div className="flex justify-center items-center">
        <h1>PROFILE</h1>
      </div>
      <div className="">
        <div className="flex justify-center items-center">
          <Image
            className="mx-1 cursor-pointer"
            src={session?.user?.image_url ?? ""}
            alt="Movie Image"
            width={200}
            height={463}
          />
        </div>
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
            <button className="border-2 p-1 absolute right-0">CHANGE</button>
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
        <div className="flex justify-center gap-10 text-xl">
          <div
            className={`cursor-pointer ${option == 0 ? "" : "text-slate-500"} px-[20px] py-[17px]`}
            onClick={() => { setOption(0) }}
          >
            <span className="px-20">Ticket</span>
          </div>
          <div
            className={`cursor-pointer ${option == 1 ? "" : "text-slate-500"} px-[20px] py-[17px]`}
            onClick={() => { setOption(1) }}
          >
            <span className="px-20">History</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default page;
