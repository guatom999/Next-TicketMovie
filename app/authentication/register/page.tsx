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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setIsLoading(true)

    await axios.post(`${process.env.NEXT_PUBLIC_DEV_CUSTOMER_URL}/user/register`, {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }).catch((err) => {
      console.log("err is", err)
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
  )
}

export default page