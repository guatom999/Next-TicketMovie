import axios from 'axios'
import React from 'react'; // importing FunctionComponent


type Props = {
    email: string,
    customer_id: string,
    movie_name:string,
    movie_id: string,
    token: string,
    reserveSeat: string[],
    price: number,
    date: string,
}

// type TestProps = {
//     token: string | null,
// }

const CheckOutWithCreditCard = async ({ email, customer_id, movie_id, movie_name, token, reserveSeat, price, date }: Props) => {
    const { data } = await axios.post("http://localhost:8103/payment/buyticket", {
        email: email,
        customer_id: customer_id,
        movie_id: movie_id,
        movie_name:movie_name,
        token: token,
        seat_no: reserveSeat,
        price: price,
        date: date,
    })

    return data

}

export default CheckOutWithCreditCard