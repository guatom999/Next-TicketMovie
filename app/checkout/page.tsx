'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'

type Props = {}

const page = (props: Props) => {

  return (
    <form name="checkoutForm" method="POST" action="checkout.php">
      <script type="text/javascript" src="https://cdn.omise.co/omise.js"
        data-key="tokn_test_5z9lkjfwqntw628zi2b"
        data-image="http://bit.ly/customer_image"
        data-frame-label="Merchant site name"
        data-button-label="Pay now"
        data-submit-label="Submit"
        data-location="no"
        data-amount="10025"
        data-currency="thb"
      >
      </script>
    </form>
  )
}

export default page