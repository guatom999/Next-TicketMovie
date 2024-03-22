import React from 'react'
import Image from 'next/image'

type Props = {}

const Carousel = (props: Props) => {
  return (
    <div className="mt-2" style={{position: 'relative',width: '1903px', height: '416px'}}>
    <Image
      alt='Mountains'
      src={`https://www.housesamyan.com/assets/uploads/banner/image_web_path/20220126005322_9DDC1635-1368-4C58-A1AF-6918758ED952.jpg`}
      layout='fill'
      style={{
        objectFit: 'contain',
      }}
    />
  </div>
  )
}

export default Carousel