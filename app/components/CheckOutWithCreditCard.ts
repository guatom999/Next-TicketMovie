import axios from "axios";

interface Props {
  email: string;
  customer_id: string;
  movie_id: string;
  movie_name: string;
  movie_date: string;
  movie_showtime: string;
  poster_image: string;
  token: string;
  reserveSeat: string[];
  price: number;
  date: string;
}

const CheckOutWithCreditCard = async ({
  email,
  customer_id,
  movie_id,
  movie_name,
  movie_date,
  movie_showtime,
  poster_image,
  token,
  reserveSeat,
  price,
  date,
}: Props) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DEV_PAYMENT_URL}/payment/buyticket`,
      {
        email: email,
        customer_id: customer_id,
        movie_id: movie_id,
        movie_name: movie_name,
        movie_date: movie_date,
        movie_showtime: movie_showtime,
        poster_image: poster_image,
        token: token,
        seat_no: reserveSeat,
        price: price,
        date: date,
      },
    );

    return data;
  } catch (error) {
    console.error("Error during payment:", error);
    throw error;
  }
};

export default CheckOutWithCreditCard;
