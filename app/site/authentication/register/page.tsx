'use client';
import React, { useState } from 'react'
import axios from 'axios'
import RegisterForm from './RegisterForm'

type Props = {}

const page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit =async (e: any) => {
    e.preventDefault()

    setIsLoading(true)

    await axios.post("http://localhost:8100/user/register", {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      },3000)
    }).catch((err) => {
      console.log("err is" , err)
    })
  }

  return (
    <RegisterForm
    isLoading={isLoading}
    username={username}
    password={password}
    email={email}
    setUsername={setUsername}
    setPassword={setPassword}
    setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
    // <div className="flex justify-center items-center">
    //   <div className="w-[400px] m-10">
    //     <p className="flex justify-center">Register</p>
    //     <form
    //       onSubmit={handleSubmit}
    //     >
    //       <div className="flex justify-center">
    //         <input className=" border-b-4 p-2" placeholder="Email"></input>
    //       </div>
    //       <div className="flex justify-center">
    //         <input className="border-b-4 p-2" placeholder="Password"></input>
    //       </div>
    //       <div className="flex justify-center">
    //         <button
    //           className="mt-12 bg-gray-300 border rounded-md p-2"
    //         // onClick={register}
    //         >
    //           Submit
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    // </div>
  )
}

export default page