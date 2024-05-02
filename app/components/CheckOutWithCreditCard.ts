import axios from 'axios'
import React from 'react'; // importing FunctionComponent


type Props = {
    email: string,
    customer_id: string,
    movie_id: string,
    token: string,
    reserveSeat: string[],
    price: number,
}

// type TestProps = {
//     token: string | null,
// }

const CheckOutWithCreditCard = async ({ email, customer_id, movie_id,token, reserveSeat, price }: Props)  => {


    await axios.post("http://localhost:8103/payment/buyticket", {
        email: email,
        customer_id: customer_id,
        movie_id: movie_id,
        token: token,
        seat_no: reserveSeat,
        price: price,
    }).then((res) => {
        console.log("res is" , res)
        return res
    }).catch((err) => {
        console.log(err)
    })

}

export default CheckOutWithCreditCard