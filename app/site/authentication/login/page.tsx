'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useRef, useState } from 'react'
import { useRouter , useParams} from 'next/navigation'




type Props = {}

const page = (props: Props) => {
  const [isError, seIsError] = useState(false)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { error } = useParams();

  const handleSubmit = () => {

    signIn("credentials", {
      email: email.current?.value,
      password: password.current?.value,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        seIsError(true)
      } else {
        router.push("/")
      }
    })
    // .catch((error) => {
    //   console.log("error is" , error)
    // })

    // .then((res) => {
    //   console.log("res is" ,res);
    //   // router.push("/")
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[400px] m-10">
        <p className="flex justify-center">Login</p>
        <div className="flex justify-center">
          <label>
            <input
              name="email"
              type="text"
              className="border-b-4 p-2"
              placeholder="Email"
              ref={email}
            />
          </label>
        </div>
        <div className="flex justify-center">
          <label>
            <input
              name="password"
              type="password"
              className="border-b-4 p-2"
              placeholder="Password"
              ref={password}
            />
          </label>
        </div>
        {isError ? (
          <div className="my-2 flex justify-center border border-red-600
          ">
            <p className="text-lg">some thing wrong</p>
          </div>
        ) : (
          <>
          </>
        )}
        <div className="flex justify-center">
          <button
            className="mt-12 bg-gray-300 border rounded-md p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default page