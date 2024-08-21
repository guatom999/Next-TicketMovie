import React from 'react'
import Image from 'next/image'

type Props = {
  data: any
}

const TicketDetail = ({ data }: Props) => {

  return (
    <div className="flex justify-center my-10 ">
      <div className="w-1/5 ">
        <div className="border bg-cyan-300 rounded-t-lg flex justify-center">
          E-Ticket
        </div>
        <div className="p-5">
          <div className="flex justify-center">
            Phum Viphurit Presents The Greng Jai Gala Live In Bangkok<br />
            KBank Siam Pic-Ganesha Theater <br />• No Age Restriction
          </div>
          <div className="flex justify-center">
            <Image
              src={`${data.src}`}
              // src={`https://lh3.googleusercontent.com/pw/AP1GczOw7HgiEu9Jxx547K3d586KZ9cF2w1IEi8kU8FaIv6bVLXvKE6lLV4-AY1ViLriU2Zo07-WyXcLUGaHc3CKO1eTvjM4iTpXTUodA5877fm8vRhTx6vTVUjZdXfJY9-C4ZnXf82rTW65ZqBbQpuhSOgotLhp4WMBHVfL_Ykf_7J_GaYKo3ahtiL0MCgapeRC9XSmsteDcxPfRh88GJ0qGziTIY69IW5wbE39HXH3S0LWsBGI8A6O2_isqFjdrIV5dQiZcTHIkzPL8IDUXSQkhrC_HLwo0lNHnSMp_z0vVNJq7TRqK1HfLNoZzQnorXbIigLX7YNKyU61D0JUtzEMmX8jq2qWs-8HFGLxncSV3WC2qNTbCuwb1egRh0ZYwW5mFEQY2msskL6iKwZydLff0PXEnrc_VuR7oDtTYgZu_cEs4cvZWPElIovwWYd3-lX4yfwcC5PsoGBkTEelvJl4DqVzKUurhqvDARRfbZxtGCyn0PryqQ6K1oe6au-3jzbN9y14klbKyVgafgZTQ4Kj1n1JjuHyCid3632EygMZ87_QzIT-DbIbz59KsD16tH-VLwI8Ia6P_nvfJjd7ies9b5oEonAV9fXieyESAgZA4F_rUR7H_xYQZB33iVTMEgli66TWMMtFcRTaWSAmVDNa1D3OW_fOT4v-Lkhm6jmjjPfnheZEGvhzE3lUFa5TdbfmCrPiOZnDTkNsrpa0dL0qhlDxwdRqk8uNhpL66nrfY_Ofb5b5oxA2sGtQy6DZKFLqKZg7xUEYEjGOOlidjHC6m5V0YwyvxYg_m_vcigGZbBrH0kQfS9uTPeNWEMMg64zhNDnA0F8YP3ftFXwBbjhgURGYgrSEkzMQ7LKbR0SwAOEraMQD--J-szA5Si5WW1EPIjnUVOYMQrJ76Ga_EZ67jCva5jUy1Q4Tja5vx9iLsZo_RJXcskweeDG7ReC3P44_UulCt5S7tLepAbmBS5GynOuRrmzh1HGKCHFBRRAQZDs1cc6VINBxX2BgE7aLcECM5KM_chTxN1vH5Wsp786oaXm9QFS4425k0iIR9qgeCL_aJaniTxPu89nnDPbH_Ye0kXa8b0sI8xAjbJF7rhBM49M_XaaIF_Q640npSlPIOFU5Zxwpg3asOkO1ykOdZBrHb-43f7VeecAnK2wO=w517-h919-s-no-gm?authuser=5`}
              alt='qr code'
              width={300}
              height={463}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail