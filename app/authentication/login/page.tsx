'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useRef } from 'react'

type Props = {}

const page = (props: Props) => {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {

    console.log("email =================>", email)
    signIn("credentials", {
      email: email.current?.value,
      password: password.current?.value,
      redirect: true,
      callbackUrl: "/",
    })

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