'use client';
import React, { useState } from 'react'
import axios from 'axios'
import RegisterForm from './RegisterForm'
import { useRouter } from "next/navigation";

type Props = {}

const page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    await axios.post(`${process.env.NEXT_PUBLIC_DEV_CUSTOMER_URL}/user/register`, {
      username: username,
      email: email,
      password: password,
    }).then(() => {
      setIsLoading(true)
      setTimeout(() => {
        setIsError(false);
        setIsLoading(false);
        setErrorMessage("");
        router.replace("/")
      }, 1000);
    }).catch((err) => {
      setIsError(true);
      console.log("errror is", err)
      setErrorMessage(err.response?.data.split(":")[1] || "An error occurred");
      setIsLoading(false);
    });
  };

  return (
    <RegisterForm
      isLoading={isLoading}
      username={username}
      password={password}
      email={email}
      setUsername={setUsername}
      setPassword={setPassword}
      isError={isError}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default page;