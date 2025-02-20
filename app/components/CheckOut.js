import React, { useState } from "react";
import Script from "react-load-script";
import CheckOutWithCreditCard from "./CheckOutWithCreditCard";
import LoadingModal from "./LoadingModal";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Ticket from "./Ticket";
import { type } from "os";

let OmiseCard;

const CheckOut = ({
  totalPrice,
  session,
  movie_id,
  movie_name,
  movie_date,
  movie_showtime,
  movie_image,
  reserveSeat,
  date,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let amount = totalPrice * 100;

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      currency: "THB",
      frameLabel: "Ticket Shop",
      submitLabel: "Pay NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omisePaymentHandler = () => {
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: (token) => {
        setIsLoading(true),
          CheckOutWithCreditCard({
            email: session.email,
            customer_id: session.user.customer_id,
            movie_id: movie_id,
            movie_name: movie_name,
            movie_date,
            movie_showtime,
            poster_image: movie_image,
            token: token,
            reserveSeat: reserveSeat,
            price: amount,
            date: date,
          })
            .then((result) => {
              console.log("result is ===========>", result);
              setTimeout(() => {
                setIsLoading(false);
                router.push(`../ticket`);
              }, 5000);

              // router.push(`../ticket/` + result.url);
            })
            .catch((error) => {
              console.log("error ------------------>", error);
              setIsError(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 5000);
            });
      },
      onFormClosed: () => {
        console.log("closed form");
      },
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/site/authentication/login");
    } else {
      creditCardConfigure();
      omisePaymentHandler();
    }
  };

  const toggleOpenLoadingModal = () => {
    setIsLoading(!isLoading);
  };

  if (isLoading) {
    return (
      <LoadingModal
        isOpen={isLoading}
        isError={isError}
        setOpen={toggleOpenLoadingModal}
        loadingMessage="Loading..."
      />
    );
  }

  return (
    <div className="own-form">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <div
          id="credit-card"
          type="button"
          onClick={(e) => {
            handleClick(e);
          }}
          className="p-4 text-5xl text-white"
        >
          ชำระเงิน {totalPrice}.
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
